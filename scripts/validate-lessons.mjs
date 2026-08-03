import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";

const root = process.cwd();
const manifestText = fs.readFileSync(path.join(root, "manifest.js"), "utf8");
const files = [...manifestText.matchAll(/"(snippets\/[^\"]+\.js)"/g)].map(match => match[1]);
const chunkFiles = [1, 2, 3, 4, 5].map(index => `content/course-chunk-${index}.js`);
const encoded = chunkFiles.map(relativeFile => {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing course data chunk: ${relativeFile}`);
  const text = fs.readFileSync(fullPath, "utf8");
  const match = text.match(/push\('([A-Za-z0-9+/=]+)'\)/);
  if (!match) throw new Error(`Invalid course data chunk: ${relativeFile}`);
  return match[1];
}).join("");
const source = zlib.gunzipSync(Buffer.from(encoded, "base64")).toString("utf8");
const contentSandbox = { window: {} };
contentSandbox.window.window = contentSandbox.window;
vm.runInNewContext(source, contentSandbox, { filename: "decompressed-course-content.js" });
const overrides = contentSandbox.window.PCB_ACADEMY_CONTENT || {};

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

const errors = [];
const lessons = [];
const lessonIds = new Map();
const taskIds = new Map();
if (!files.length) errors.push("Manifest contains no lessons.");

for (const [index, relativeFile] of files.entries()) {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) { errors.push(`Missing manifest file: ${relativeFile}`); continue; }
  const captured = [];
  try {
    vm.runInNewContext(fs.readFileSync(fullPath, "utf8"), { PCB_ACADEMY: { register: lesson => captured.push(lesson) } }, { filename: relativeFile });
  } catch (error) { errors.push(`Syntax/runtime error in ${relativeFile}: ${error.message}`); continue; }
  if (captured.length !== 1) { errors.push(`${relativeFile} must register exactly one lesson.`); continue; }
  const baseLesson = captured[0];
  const override = overrides[baseLesson.id];
  if (!override) { errors.push(`Missing complete content override for lesson "${baseLesson.id}".`); continue; }
  const lesson = { ...baseLesson, ...override, html: buildLessonHtml(override) };
  lessons.push({ ...lesson, index, relativeFile });

  for (const field of ["id", "chapter", "title", "objective", "duration", "html"]) {
    if (!lesson[field] || typeof lesson[field] !== "string") errors.push(`${relativeFile} is missing string field "${field}".`);
  }
  if (lessonIds.has(lesson.id)) errors.push(`Duplicate lesson id "${lesson.id}".`); else lessonIds.set(lesson.id, relativeFile);
  if (lesson.html.length < 1800) errors.push(`${relativeFile} is too short (${lesson.html.length} chars).`);
  if ((lesson.html.match(/<h3>/g) || []).length < 7) errors.push(`${relativeFile} needs at least 7 explanatory sections.`);
  if (!Array.isArray(lesson.tasks) || lesson.tasks.length < 4) errors.push(`${relativeFile} needs at least 4 self-check tasks.`);
  else for (const task of lesson.tasks) {
    if (taskIds.has(task.id)) errors.push(`Duplicate task id "${task.id}".`); else taskIds.set(task.id, relativeFile);
  }
  if (!lesson.quiz || !Array.isArray(lesson.quiz.answers) || lesson.quiz.answers.length < 3) errors.push(`${relativeFile} needs a quiz.`);
}

const positions = new Map(lessons.map(lesson => [lesson.id, lesson.index]));
for (const lesson of lessons) for (const requirement of lesson.requires || []) {
  if (!positions.has(requirement)) errors.push(`Unknown requirement "${requirement}" in ${lesson.relativeFile}.`);
  else if (positions.get(requirement) >= lesson.index) errors.push(`Requirement "${requirement}" must appear before ${lesson.id}.`);
}
if (Object.keys(overrides).length !== lessons.length) errors.push(`Expected ${lessons.length} overrides, found ${Object.keys(overrides).length}.`);

if (errors.length) {
  console.error("PCB Academy validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Validated ${lessons.length} complete lessons and ${taskIds.size} unique tasks.`);
