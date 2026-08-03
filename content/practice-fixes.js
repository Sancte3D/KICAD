(function applyPracticeFixes() {
  const apply = content => {
    if (content["placement-matrix"]) {
      content["placement-matrix"].requires = ["placement-flow"];
    }
    window.PCB_ACADEMY_CONTENT = content;
    return content;
  };

  if (window.PCB_ACADEMY_CONTENT) apply(window.PCB_ACADEMY_CONTENT);
  if (window.PCB_ACADEMY_CONTENT_PROMISE) {
    window.PCB_ACADEMY_CONTENT_PROMISE = window.PCB_ACADEMY_CONTENT_PROMISE.then(apply);
  }
})();
