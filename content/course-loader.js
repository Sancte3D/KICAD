window.PCB_ACADEMY_CONTENT_PROMISE = (async () => {
  const encoded = (window.PCB_COURSE_CHUNKS || []).join("");
  if (!encoded) throw new Error("Kursdaten fehlen.");
  if (typeof DecompressionStream === "undefined") {
    throw new Error("Dieser Browser unterstützt die lokale Kursentpackung nicht. Bitte einen aktuellen Chrome-, Edge-, Firefox- oder Safari-Browser verwenden.");
  }
  const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  const source = await new Response(stream).text();
  (0, eval)(source);
  if (!window.PCB_ACADEMY_CONTENT) throw new Error("Kursdaten konnten nicht initialisiert werden.");
  return window.PCB_ACADEMY_CONTENT;
})();
