window.PCB_ACADEMY = {
  lessons: [],
  register(lesson) {
    if (!lesson || !lesson.id || !lesson.title) {
      throw new Error("Ungültiges Lesson-Snippet");
    }
    this.lessons.push(lesson);
  }
};

const STORAGE_KEY = "pcb-academy-progress-v2";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
let currentLessonId = null;

function lessonComplete(id) {
  const lesson = PCB_ACADEMY.lessons.find(item => item.id === id);
  return Boolean(
    lesson &&
    (lesson.tasks || []).length &&
    lesson.tasks.every(task => state[task.id])
  );
}

function lessonUnlocked(lesson) {
  return (lesson.requires || []).every(lessonComplete);
}

function lessonNumber(id) {
  return PCB_ACADEMY.lessons.findIndex(item => item.id === id) + 1;
}

function nextCourseLesson() {
  return PCB_ACADEMY.lessons.find(lesson => lessonUnlocked(lesson) && !lessonComplete(lesson))
    || PCB_ACADEMY.lessons.find(lesson => !lessonComplete(lesson))
    || null;
}

function getLessonGlossary(lessonId) {
  const glossary = window.PCB_ACADEMY_GLOSSARY || {};
  const lessonTerms = window.PCB_ACADEMY_LESSON_TERMS || {};
  return (lessonTerms[lessonId] || []).map(termId => ({
    id: termId,
    ...glossary[termId]
  })).filter(term => term.label && term.definition && term.practice);
}

function buildGlossaryHtml(data) {
  const terms = getLessonGlossary(data.id);
  if (!terms.length) {
    return `
      <section class="lesson-glossary glossary-error">
        <div class="section-label">Begriffe zuerst</div>
        <h3>0. Begriffe und Abkürzungen</h3>
        <p>Für diese Lektion fehlt die verpflichtende Begriffseinführung. Die Inhaltsprüfung sollte diesen Zustand verhindern.</p>
      </section>
    `;
  }

  return `
    <section class="lesson-glossary">
      <div class="section-label">Vor dem eigentlichen Inhalt</div>
      <h3>0. Begriffe und Abkürzungen zuerst</h3>
      <p class="glossary-intro">Diese Begriffe werden in der Lektion verwendet. Lies sie zuerst. Abkürzung, Bedeutung und praktische Folge werden getrennt erklärt.</p>
      <div class="glossary-grid">
        ${terms.map(term => `
          <article class="glossary-card" id="term-${term.id}">
            <h4>${term.label}</h4>
            <p>${term.definition}</p>
            <div class="glossary-practice"><strong>In der Praxis:</strong> ${term.practice}</div>
            ${(term.aliases || []).length ? `<div class="glossary-aliases"><strong>Schreibweisen:</strong> ${term.aliases.join(", ")}</div>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function buildLessonHtml(data) {
  const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  const steps = `<ol>${data.steps.map(item => `<li>${item}</li>`).join("")}</ol>`;
  return `
    ${buildGlossaryHtml(data)}
    <div class="lesson-intro"><p>${data.intro}</p></div>
    <h3>1. Was ist das?</h3><p>${data.concept}</p>
    <h3>2. Warum ist das wichtig?</h3><p>${data.why}</p>
    <h3>3. Schritt für Schritt</h3>${steps}
    ${data.diagram || ""}
    <h3>4. Konkretes Beispiel</h3><div class="example"><p>${data.example}</p></div>
    <h3>5. Im Schaltplan</h3><p>${data.schematic}</p>
    <h3>6. Auf dem PCB</h3><p>${data.pcb}</p>
    <h3>7. Typische Fehler</h3>${list(data.errors)}
    <div class="remember"><strong>Merksatz</strong><p>${data.remember}</p></div>
  `;
}

function applyContentOverrides() {
  const overrides = window.PCB_ACADEMY_CONTENT || {};
  for (const lesson of PCB_ACADEMY.lessons) {
    const data = overrides[lesson.id];
    if (!data) continue;
    Object.assign(lesson, data, {
      glossary: getLessonGlossary(data.id),
      html: buildLessonHtml(data)
    });
  }
}

function loadScripts(files) {
  return files.reduce(
    (promise, file) => promise.then(() => new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = file;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Snippet konnte nicht geladen werden: ${file}`));
      document.body.appendChild(script);
    })),
    Promise.resolve()
  );
}

function renderNavigation(filter = "") {
  const nav = document.getElementById("nav");
  const normalized = filter.trim().toLowerCase();
  nav.innerHTML = "";

  PCB_ACADEMY.lessons.forEach((lesson, index) => {
    const glossaryText = (lesson.glossary || [])
      .flatMap(term => [term.label, term.definition, term.practice, ...(term.aliases || [])])
      .join(" ");

    const searchable = [
      lesson.title,
      lesson.chapter,
      lesson.objective,
      ...(lesson.keywords || []),
      ...(lesson.tags || []),
      glossaryText
    ].join(" ").toLowerCase();

    if (normalized && !searchable.includes(normalized)) return;

    const button = document.createElement("button");
    const complete = lessonComplete(lesson.id);
    const unlocked = lessonUnlocked(lesson);

    button.className = [
      currentLessonId === lesson.id ? "active" : "",
      complete ? "complete" : "",
      !unlocked ? "locked" : ""
    ].filter(Boolean).join(" ");

    button.disabled = !unlocked;
    button.innerHTML = `
      <span class="nav-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="nav-copy">
        <strong>${lesson.title}</strong>
        <small>${complete ? "Abgeschlossen" : unlocked ? lesson.chapter : "Vorherige Lektion abschließen"}</small>
      </span>
    `;
    button.title = unlocked ? lesson.objective : "Diese Lektion baut auf der vorherigen Lektion auf.";
    button.addEventListener("click", () => openLesson(lesson.id));
    nav.appendChild(button);
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderQuiz(lesson) {
  if (!lesson.quiz) return "";
  return `
    <article class="lesson quiz">
      <div class="section-label">Wissensprüfung</div>
      <h3>Mini-Quiz</h3>
      <p>${lesson.quiz.question}</p>
      <div class="quiz-answers">
        ${lesson.quiz.answers.map((answer, index) => `
          <button data-correct="${index === lesson.quiz.correct}">${answer}</button>
        `).join("")}
      </div>
      <p class="quiz-feedback" aria-live="polite"></p>
    </article>
  `;
}

function renderChecklist(lesson) {
  const checks = (lesson.tasks || []).map(task => `
    <label class="check">
      <input type="checkbox" data-task="${task.id}" ${state[task.id] ? "checked" : ""}>
      <span>${task.label}</span>
    </label>
  `).join("");

  return `
    <article class="lesson self-check">
      <div class="section-label">Erst nach dem Lesen</div>
      <h3>Selbsttest und Abschluss</h3>
      <p>Setze einen Punkt nur dann auf erledigt, wenn du ihn ohne Ablesen erklären oder im eigenen Projekt zeigen kannst.</p>
      ${checks}
    </article>
  `;
}

function openLesson(id) {
  const lesson = PCB_ACADEMY.lessons.find(item => item.id === id);
  if (!lesson || !lessonUnlocked(lesson)) return;

  currentLessonId = id;
  const index = PCB_ACADEMY.lessons.findIndex(item => item.id === id);
  const previous = PCB_ACADEMY.lessons[index - 1] || null;
  const next = PCB_ACADEMY.lessons[index + 1] || null;

  document.getElementById("view").innerHTML = `
    <article class="lesson lesson-header">
      <div class="lesson-kicker">${lesson.chapter} · Lektion ${index + 1} von ${PCB_ACADEMY.lessons.length}</div>
      <h2>${lesson.title}</h2>
      <p class="objective">${lesson.objective}</p>
      <div class="lesson-meta">
        <span><b>Zeit:</b> ${lesson.duration || "20–30 min"}</span>
        <span><b>Status:</b> ${lessonComplete(lesson.id) ? "abgeschlossen" : "offen"}</span>
        <span><b>Voraussetzung:</b> ${(lesson.requires || []).length ? lesson.requires.map(req => PCB_ACADEMY.lessons.find(x => x.id === req)?.title || req).join(", ") : "keine"}</span>
      </div>
      <div class="tags">${(lesson.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      <div class="lesson-coverage"><strong>${(lesson.glossary || []).length}</strong> Begriffe werden vor dem Inhalt ausdrücklich eingeführt.</div>
    </article>

    <article class="lesson lesson-content">
      ${lesson.html}
    </article>

    ${renderChecklist(lesson)}
    ${renderQuiz(lesson)}

    <div class="lesson-navigation">
      <button class="action" id="previousLesson" ${previous ? "" : "disabled"}>Vorherige Lektion</button>
      <button class="action primary" id="nextLesson" ${next && lessonComplete(lesson.id) ? "" : "disabled"}>
        ${next ? "Nächste Lektion" : "Kurs abgeschlossen"}
      </button>
    </div>
  `;

  document.querySelectorAll("[data-task]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      state[checkbox.dataset.task] = checkbox.checked;
      saveState();
      updateProgress();
      renderNavigation(document.getElementById("search").value);
      const nextButton = document.getElementById("nextLesson");
      if (nextButton && next) nextButton.disabled = !lessonComplete(lesson.id);
      openLessonStatusOnly(lesson);
    });
  });

  document.querySelectorAll(".quiz button").forEach(button => {
    button.addEventListener("click", () => {
      const container = button.closest(".quiz");
      container.querySelectorAll("button").forEach(item => item.classList.remove("correct", "wrong"));
      const correct = button.dataset.correct === "true";
      button.classList.add(correct ? "correct" : "wrong");
      container.querySelector(".quiz-feedback").textContent = correct
        ? "Richtig. Du kannst die Lektion jetzt mit der Checkliste prüfen."
        : "Noch nicht. Lies die Begriffseinführung und die relevante Erklärung erneut.";
    });
  });

  document.getElementById("previousLesson")?.addEventListener("click", () => previous && openLesson(previous.id));
  document.getElementById("nextLesson")?.addEventListener("click", () => next && lessonComplete(lesson.id) && openLesson(next.id));

  renderNavigation(document.getElementById("search").value);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openLessonStatusOnly(lesson) {
  const status = document.querySelector(".lesson-meta span:nth-child(2)");
  if (status) status.innerHTML = `<b>Status:</b> ${lessonComplete(lesson.id) ? "abgeschlossen" : "offen"}`;
}

function updateProgress() {
  const allTasks = PCB_ACADEMY.lessons.flatMap(lesson => lesson.tasks || []);
  const doneTasks = allTasks.filter(task => state[task.id]).length;
  const completedLessons = PCB_ACADEMY.lessons.filter(lesson => lessonComplete(lesson.id)).length;
  const taskPercent = allTasks.length ? Math.round(doneTasks / allTasks.length * 100) : 0;
  const next = nextCourseLesson();

  document.getElementById("bar").style.width = `${taskPercent}%`;
  document.getElementById("progress").textContent = `${taskPercent} % · ${completedLessons}/${PCB_ACADEMY.lessons.length} Lektionen`;
  document.getElementById("statProgress").textContent = `${taskPercent} %`;
  document.getElementById("statDone").textContent = `${completedLessons} / ${PCB_ACADEMY.lessons.length}`;
  document.getElementById("statNext").textContent = next
    ? `Lektion ${lessonNumber(next.id)}: ${next.title}`
    : "Alle Lektionen abgeschlossen";

  const startButton = document.getElementById("continueCourse");
  if (startButton) {
    startButton.textContent = next ? "Nächste offene Lektion öffnen" : "Kurs abgeschlossen";
    startButton.disabled = !next;
    startButton.onclick = () => next && openLesson(next.id);
  }
}

document.getElementById("search").addEventListener("input", event => renderNavigation(event.target.value));
document.getElementById("focus").addEventListener("click", () => {
  document.body.classList.toggle("focus");
  document.getElementById("focus").textContent = document.body.classList.contains("focus")
    ? "Fokusmodus beenden"
    : "Fokusmodus";
});
document.getElementById("resetProgress").addEventListener("click", () => {
  if (!window.confirm("Wirklich den gesamten lokalen Lernfortschritt zurücksetzen?")) return;
  state = {};
  saveState();
  currentLessonId = null;
  document.getElementById("view").innerHTML = "";
  updateProgress();
  renderNavigation();
});

Promise.all([loadScripts(PCB_ACADEMY_MANIFEST), window.PCB_ACADEMY_CONTENT_PROMISE])
  .then(() => {
    applyContentOverrides();
    updateProgress();
    renderNavigation();
  })
  .catch(error => {
    document.getElementById("view").innerHTML = `
      <article class="lesson">
        <h2>Ladefehler</h2>
        <p>${error.message}</p>
      </article>
    `;
  });
