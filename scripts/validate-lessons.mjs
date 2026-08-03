import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";

const root = process.cwd();
const read = relativeFile => fs.readFileSync(path.join(root, relativeFile), "utf8");

const manifestText = read("manifest.js");
const files = [...manifestText.matchAll(/"(snippets\/[^"]+\.js)"/g)].map(match => match[1]);
const chunkFiles = [1, 2, 3, 4, 5].map(index => `content/course-chunk-${index}.js`);

const encoded = chunkFiles.map(relativeFile => {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing course data chunk: ${relativeFile}`);
  const text = read(relativeFile);
  const match = text.match(/push\('([A-Za-z0-9+/=]+)'\)/);
  if (!match) throw new Error(`Invalid course data chunk: ${relativeFile}`);
  return match[1];
}).join("");

const source = zlib.gunzipSync(Buffer.from(encoded, "base64")).toString("utf8");
const contentSandbox = { window: {} };
contentSandbox.window.window = contentSandbox.window;
vm.runInNewContext(source, contentSandbox, { filename: "decompressed-course-content.js" });
const overrides = contentSandbox.window.PCB_ACADEMY_CONTENT || {};

for (const relativeFile of [
  "content/practice-expansion.js",
  "content/practice-fixes.js",
  "content/fundamentals-expansion.js"
]) {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing ${relativeFile}`);
  contentSandbox.window.PCB_ACADEMY_CONTENT = overrides;
  vm.runInNewContext(read(relativeFile), contentSandbox, { filename: relativeFile });
}

const glossarySandbox = { window: {} };
glossarySandbox.window.window = glossarySandbox.window;
for (const relativeFile of [
  "content/glossary/glossary-01.js",
  "content/glossary/glossary-02.js",
  "content/glossary/glossary-03.js",
  "content/glossary/glossary-04.js",
  "content/glossary/glossary-05.js",
  "content/glossary/glossary-06.js",
  "content/glossary/lesson-terms.js"
]) {
  if (!fs.existsSync(path.join(root, relativeFile))) throw new Error(`Missing ${relativeFile}`);
  vm.runInNewContext(read(relativeFile), glossarySandbox, { filename: relativeFile });
}
const glossary = glossarySandbox.window.PCB_ACADEMY_GLOSSARY || {};
const lessonTerms = glossarySandbox.window.PCB_ACADEMY_LESSON_TERMS || {};

function buildLessonHtml(data) {
  const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  return `
    <p class="lesson-intro">${data.intro}</p>
    <h3>1. Was ist das?</h3><p>${data.concept}</p>
    <h3>2. Warum ist das wichtig?</h3><p>${data.why}</p>
    <h3>3. Schritt für Schritt</h3>${list(data.steps)}
    ${data.diagram || ""}
    <h3>4. Konkretes Beispiel</h3><div class="example">${data.example}</div>
    <h3>5. Im Schaltplan</h3><p>${data.schematic}</p>
    <h3>6. Auf dem PCB</h3><p>${data.pcb}</p>
    <h3>7. Typische Fehler</h3>${list(data.errors)}
    <div class="remember"><strong>Merksatz:</strong> ${data.remember}</div>
  `;
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ");
}

function uppercaseTokens(value) {
  return new Set(stripHtml(value).match(/\b[A-Z][A-Z0-9]{1,12}\b/g) || []);
}

function glossaryTokens(term) {
  return uppercaseTokens([
    term.label,
    ...(term.aliases || [])
  ].join(" "));
}

const errors = [];
const lessons = [];
const lessonIds = new Map();
const taskIds = new Map();

if (!files.length) errors.push("Manifest contains no lessons.");

for (const [index, relativeFile] of files.entries()) {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing manifest file: ${relativeFile}`);
    continue;
  }

  const captured = [];
  try {
    vm.runInNewContext(
      read(relativeFile),
      { PCB_ACADEMY: { register: lesson => captured.push(lesson) } },
      { filename: relativeFile }
    );
  } catch (error) {
    errors.push(`Syntax/runtime error in ${relativeFile}: ${error.message}`);
    continue;
  }

  if (captured.length !== 1) {
    errors.push(`${relativeFile} must register exactly one lesson.`);
    continue;
  }

  const baseLesson = captured[0];
  const override = overrides[baseLesson.id];
  if (!override) {
    errors.push(`Missing complete content override for lesson "${baseLesson.id}".`);
    continue;
  }

  const lesson = { ...baseLesson, ...override, html: buildLessonHtml(override) };
  lessons.push({ ...lesson, index, relativeFile });

  for (const field of ["id", "chapter", "title", "objective", "duration", "html"]) {
    if (!lesson[field] || typeof lesson[field] !== "string") {
      errors.push(`${relativeFile} is missing string field "${field}".`);
    }
  }

  if (lessonIds.has(lesson.id)) {
    errors.push(`Duplicate lesson id "${lesson.id}".`);
  } else {
    lessonIds.set(lesson.id, relativeFile);
  }

  if (lesson.html.length < 1800) errors.push(`${relativeFile} is too short (${lesson.html.length} chars).`);
  if ((lesson.html.match(/<h3>/g) || []).length < 7) errors.push(`${relativeFile} needs at least 7 explanatory sections.`);
  if (!Array.isArray(lesson.errors) || lesson.errors.length < 4) errors.push(`${relativeFile} needs at least 4 practical error cases.`);
  if (!Array.isArray(lesson.tasks) || lesson.tasks.length < 4) {
    errors.push(`${relativeFile} needs at least 4 self-check tasks.`);
  } else {
    for (const task of lesson.tasks) {
      if (taskIds.has(task.id)) errors.push(`Duplicate task id "${task.id}".`);
      else taskIds.set(task.id, relativeFile);
    }
  }
  if (!lesson.quiz || !Array.isArray(lesson.quiz.answers) || lesson.quiz.answers.length < 3) {
    errors.push(`${relativeFile} needs a quiz.`);
  }
}

const positions = new Map(lessons.map(lesson => [lesson.id, lesson.index]));
for (const lesson of lessons) {
  for (const requirement of lesson.requires || []) {
    if (!positions.has(requirement)) errors.push(`Unknown requirement "${requirement}" in ${lesson.relativeFile}.`);
    else if (positions.get(requirement) >= lesson.index) errors.push(`Requirement "${requirement}" must appear before ${lesson.id}.`);
  }
}

if (Object.keys(overrides).length !== lessons.length) {
  errors.push(`Expected ${lessons.length} overrides, found ${Object.keys(overrides).length}.`);
}

const electricity = lessons.find(item => item.id === "electricity");
if (!electricity) {
  errors.push("Missing first-principles electricity lesson.");
} else {
  const requiredPhrases = [
    "U bedeutet Spannung",
    "I bedeutet Strom",
    "R bedeutet Widerstand",
    "P bedeutet Leistung",
    "Volt",
    "Ampere",
    "Ohm",
    "Watt"
  ];
  const combined = [electricity.intro, electricity.concept, electricity.why, electricity.example, electricity.remember].join(" ");
  for (const phrase of requiredPhrases) {
    if (!combined.includes(phrase)) errors.push(`Electricity lesson must explicitly explain "${phrase}".`);
  }
  if (!Array.isArray(electricity.steps) || electricity.steps.length < 10) {
    errors.push("Electricity lesson needs at least 10 ordered first-principles steps.");
  }
  if (!electricity.diagram?.includes("Formelzeichen") || !electricity.diagram?.includes("Einheit")) {
    errors.push("Electricity lesson needs a symbol-to-unit reference table.");
  }
  if (
    !(electricity.pcb?.includes("Leiterbahnen") || electricity.pcb?.includes("Kupferbahnen")) ||
    !electricity.pcb?.includes("Wärme")
  ) {
    errors.push("Electricity lesson must connect the four quantities to PCB consequences.");
  }
}

const ohmsLaw = lessons.find(item => item.id === "ohms-law");
if (!ohmsLaw) {
  errors.push("Missing expanded Ohm's law lesson.");
} else {
  if (!Array.isArray(ohmsLaw.steps) || ohmsLaw.steps.length < 8) {
    errors.push("Ohm's law lesson needs at least 8 ordered calculation steps.");
  }
  if (
    !ohmsLaw.concept?.includes("U = R × I") ||
    !ohmsLaw.concept?.includes("I = U ÷ R") ||
    !ohmsLaw.concept?.includes("R = U ÷ I")
  ) {
    errors.push("Ohm's law lesson must explain all three formula forms in words.");
  }
}

const manifestIds = lessons.map(lesson => lesson.id);
const mappedIds = Object.keys(lessonTerms);
for (const lessonId of manifestIds) {
  const mapped = lessonTerms[lessonId];
  if (!Array.isArray(mapped)) {
    errors.push(`Lesson "${lessonId}" has no terminology map.`);
    continue;
  }
  if (mapped.length < 5) {
    errors.push(`Lesson "${lessonId}" introduces only ${mapped.length} terms; at least 5 are required.`);
  }
  if (new Set(mapped).size !== mapped.length) {
    errors.push(`Lesson "${lessonId}" contains duplicate glossary assignments.`);
  }
  for (const termId of mapped) {
    const term = glossary[termId];
    if (!term) {
      errors.push(`Lesson "${lessonId}" references missing glossary term "${termId}".`);
      continue;
    }
    if (!term.label || term.label.trim().length < 2) {
      errors.push(`Glossary term "${termId}" needs a visible label.`);
    }
    if (!term.definition || term.definition.trim().length < 80) {
      errors.push(`Glossary term "${termId}" needs a complete technical definition.`);
    }
    if (!term.practice || term.practice.trim().length < 45) {
      errors.push(`Glossary term "${termId}" needs a practical consequence.`);
    }
    if (!Array.isArray(term.aliases)) {
      errors.push(`Glossary term "${termId}" needs an aliases array.`);
    }
  }
}

for (const extraId of mappedIds.filter(id => !manifestIds.includes(id))) {
  errors.push(`Terminology map contains unknown lesson "${extraId}".`);
}

const tokenWhitelist = new Set([
  "AC", "DC", "HTML", "SVG", "PDF",
  "V", "A", "W", "F", "H", "K", "M",
  "OK", "HIGH", "LOW"
]);
const knownTokens = new Set(tokenWhitelist);

for (const lesson of lessons) {
  for (const termId of lessonTerms[lesson.id] || []) {
    const term = glossary[termId];
    if (!term) continue;
    for (const token of glossaryTokens(term)) knownTokens.add(token);
  }

  const body = [
    lesson.title,
    lesson.objective,
    lesson.intro,
    lesson.concept,
    lesson.why,
    ...(lesson.steps || []),
    lesson.example,
    lesson.schematic,
    lesson.pcb,
    ...(lesson.errors || []),
    lesson.remember,
    lesson.quiz?.question,
    ...(lesson.quiz?.answers || [])
  ].join(" ");

  const unknown = [...uppercaseTokens(body)]
    .filter(token => !knownTokens.has(token))
    .sort();

  if (unknown.length) {
    errors.push(
      `Lesson "${lesson.id}" uses uppercase terms before explanation: ${unknown.join(", ")}. ` +
      `Add them to the glossary and to this or an earlier lesson.`
    );
  }
}

const requiredPracticeLessons = [
  "footprints-pin1",
  "mechanical-placement",
  "placement-flow",
  "placement-matrix",
  "datasheet-reading"
];
for (const requiredPracticeLesson of requiredPracticeLessons) {
  const lesson = lessons.find(item => item.id === requiredPracticeLesson);
  if (!lesson) {
    errors.push(`Missing required practice lesson "${requiredPracticeLesson}".`);
    continue;
  }
  if (!Array.isArray(lesson.steps) || lesson.steps.length < 7) {
    errors.push(`Practice lesson "${requiredPracticeLesson}" needs at least 7 ordered learning steps.`);
  }
  if (!lesson.diagram?.includes("matrix") && requiredPracticeLesson !== "mechanical-placement") {
    errors.push(`Practice lesson "${requiredPracticeLesson}" needs a decision table or placement matrix.`);
  }
}

if (errors.length) {
  console.error("PCB Academy validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const totalAssignments = Object.values(lessonTerms).reduce((sum, entries) => sum + entries.length, 0);
console.log(
  `Validated ${lessons.length} complete lessons, ${taskIds.size} unique tasks, ` +
  `${Object.keys(glossary).length} glossary entries and ${totalAssignments} lesson-term assignments.`
);
