import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "manifest.js");
const manifestText = fs.readFileSync(manifestPath, "utf8");
const files = [...manifestText.matchAll(/"(snippets\/[^"]+\.js)"/g)].map(match => match[1]);

if (!files.length) {
  throw new Error("Manifest contains no snippet files.");
}

const lessonIds = new Map();
const taskIds = new Map();
const lessons = [];
const errors = [];

for (const [index, relativeFile] of files.entries()) {
  const fullPath = path.join(root, relativeFile);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing manifest file: ${relativeFile}`);
    continue;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  try {
    new Function(source);
  } catch (error) {
    errors.push(`Syntax error in ${relativeFile}: ${error.message}`);
  }

  const lessonId = source.match(/\bid\s*:\s*"([^"]+)"/)?.[1];
  if (!lessonId) {
    errors.push(`Missing lesson id in ${relativeFile}`);
    continue;
  }

  if (lessonIds.has(lessonId)) {
    errors.push(`Duplicate lesson id "${lessonId}" in ${relativeFile} and ${lessonIds.get(lessonId)}`);
  } else {
    lessonIds.set(lessonId, relativeFile);
  }

  const requiresBlock = source.match(/\brequires\s*:\s*\[([^\]]*)\]/)?.[1] ?? "";
  const requires = [...requiresBlock.matchAll(/"([^"]+)"/g)].map(match => match[1]);
  const localTaskIds = [...source.matchAll(/\{\s*id\s*:\s*"([^"]+)"\s*,\s*label\s*:/g)].map(match => match[1]);

  for (const taskId of localTaskIds) {
    if (taskIds.has(taskId)) {
      errors.push(`Duplicate task id "${taskId}" in ${relativeFile} and ${taskIds.get(taskId)}`);
    } else {
      taskIds.set(taskId, relativeFile);
    }
  }

  lessons.push({ index, relativeFile, lessonId, requires });
}

const positions = new Map(lessons.map(lesson => [lesson.lessonId, lesson.index]));
for (const lesson of lessons) {
  for (const requirement of lesson.requires) {
    if (!positions.has(requirement)) {
      errors.push(`Unknown requirement "${requirement}" in ${lesson.relativeFile}`);
    } else if (positions.get(requirement) >= lesson.index) {
      errors.push(`Requirement "${requirement}" must appear before ${lesson.lessonId}`);
    }
  }
}

if (errors.length) {
  console.error("PCB Academy validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${lessons.length} lessons and ${taskIds.size} unique tasks.`);
