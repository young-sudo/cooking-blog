// A–Z toggle for the dish grid on category pages.
(function () {
  var grid = document.querySelector(".dish-grid");
  var button = document.querySelector(".sort-toggle");
  if (!grid || !button) return;

  var original = Array.prototype.slice.call(grid.children);
  var collator = new Intl.Collator(["pl", "en"], { sensitivity: "base" });

  function render(cards) {
    cards.forEach(function (card) { grid.appendChild(card); });
  }

  button.addEventListener("click", function () {
    var sorted = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(sorted));
    button.textContent = sorted ? "Newest first" : "Sort A–Z";
    render(sorted
      ? original.slice().sort(function (a, b) {
          return collator.compare(a.dataset.title, b.dataset.title);
        })
      : original);
  });
})();
