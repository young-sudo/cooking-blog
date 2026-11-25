// Dish order on category pages: random on load, with a Shuffle / A–Z switch.
(function () {
  var grid = document.querySelector(".dish-grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.children);
  var collator = new Intl.Collator(["pl", "en"], { sensitivity: "base" });

  function render(list) {
    list.forEach(function (card) { grid.appendChild(card); });
  }

  // Fisher–Yates shuffle on a copy.
  function shuffled(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function alphabetical(list) {
    return list.slice().sort(function (a, b) {
      return collator.compare(a.dataset.title, b.dataset.title);
    });
  }

  render(shuffled(cards));
  grid.classList.add("is-ready");

  var toggle = document.querySelector(".switch");
  if (!toggle) return;
  var labels = document.querySelectorAll(".order-label");

  // mode: "shuffle" | "alpha". Choosing shuffle again reshuffles.
  function setMode(mode) {
    var alpha = mode === "alpha";
    toggle.setAttribute("aria-checked", String(alpha));
    labels.forEach(function (label) {
      label.classList.toggle("is-active", label.dataset.mode === mode);
    });
    render(alpha ? alphabetical(cards) : shuffled(cards));
  }

  toggle.addEventListener("click", function () {
    setMode(toggle.getAttribute("aria-checked") === "true" ? "shuffle" : "alpha");
  });
  labels.forEach(function (label) {
    label.addEventListener("click", function () { setMode(label.dataset.mode); });
  });
})();
