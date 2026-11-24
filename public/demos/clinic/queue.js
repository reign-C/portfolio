/* Local queue state for the clinic demo pages. Same-origin iframes share it. */
(function () {
  var KEY = "clinic-demo-queue";
  var KEYS = ["GEN_CHECK", "LABORATORY", "FAMILY_PLAN", "BLOOD_SERVICE", "ULTRASOUND"];
  var CODES = { GEN_CHECK: "GEN", LABORATORY: "LAB", FAMILY_PLAN: "FAM", BLOOD_SERVICE: "BLD", ULTRASOUND: "ULT" };
  var page = window.CLINIC_PAGE;

  function empty() {
    var out = { services: {}, current: {}, log: [] };
    KEYS.forEach(function (k) {
      out.services[k] = { waiting: 0, called: 0, issued: 0 };
      out.current[k] = 0;
    });
    return out;
  }
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : empty();
    } catch (e) {
      return empty();
    }
  }
  function write(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
    render(state);
  }
  function pad(n) {
    return String(n).padStart(3, "0");
  }
  function $(id) {
    return document.getElementById(id);
  }

  function renderKiosk(state) {
    KEYS.forEach(function (k) {
      var card = document.querySelector('.kiosk-card[data-service="' + k + '"]');
      if (!card) return;
      var waiting = card.querySelector('[data-waiting="' + k + '"]');
      var current = card.querySelector('[data-current="' + k + '"]');
      if (waiting) waiting.textContent = state.services[k].waiting;
      if (current) current.textContent = state.current[k] ? pad(state.current[k]) : "---";
    });

    var bar = $("kioskLiveBarContent");
    if (bar) {
      var called = KEYS.filter(function (k) { return state.current[k]; });
      bar.textContent = called.length
        ? called.map(function (k) { return CODES[k] + "  " + pad(state.current[k]); }).join("     ")
        : "";
    }
  }

  function renderAdmin(state) {
    KEYS.forEach(function (k) {
      var waiting = $("waiting-" + k);
      var current = $("current-" + k);
      var called = $("called-" + k);
      if (waiting) waiting.textContent = state.services[k].waiting;
      if (current) current.textContent = state.current[k] ? pad(state.current[k]) : "---";
      if (called) called.textContent = state.current[k];
    });
  }

  function renderDisplay(state) {
    var latest = "---";
    var top = 0;
    KEYS.forEach(function (k) {
      var count = $("disp-count-" + k);
      var current = $("disp-current-" + k);
      var next = $("disp-next-" + k);
      var next2 = $("disp-waiting-a-" + k);
      var next3 = $("disp-waiting-b-" + k);
      if (count) count.textContent = state.services[k].waiting;
      if (current) current.textContent = state.current[k] ? pad(state.current[k]) : "---";
      if (next) next.textContent = state.current[k] ? pad(state.current[k] + 1) : "---";
      if (next2) next2.textContent = state.current[k] ? pad(state.current[k] + 2) : "---";
      if (next3) next3.textContent = state.current[k] ? pad(state.current[k] + 3) : "---";
      if (state.current[k] > top) {
        top = state.current[k];
        latest = CODES[k] + " " + pad(state.current[k]);
      }
    });
    var callout = $("tvCalloutText");
    if (callout) callout.textContent = "NOW CALLING - " + latest;
  }

  function render(state) {
    if (page === "kiosk") renderKiosk(state);
    if (page === "admin") renderAdmin(state);
    if (page === "display") renderDisplay(state);
  }

  function clock() {
    var now = new Date();
    var h = now.getHours();
    var suffix = h >= 12 ? "PM" : "AM";
    var hour = h % 12 || 12;
    var time =
      String(hour).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0") + " " + suffix;
    var date = now.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    ["currentTime", "adminTime"].forEach(function (id) { var el = $(id); if (el) el.textContent = time; });
    ["currentDate", "adminDate"].forEach(function (id) { var el = $(id); if (el) el.textContent = date; });
  }

  if (page === "kiosk") {
    var cards = document.querySelectorAll(".kiosk-card[data-service]");
    Array.prototype.forEach.call(cards, function (card) {
      var key = card.getAttribute("data-service");
      var issue = function () {
        var state = read();
        var svc = state.services[key];
        svc.waiting += 1;
        svc.issued += 1;
        write(state);

        var number = card.querySelector('[data-ticket-number="' + key + '"]');
        if (number) number.textContent = pad(svc.issued);
        card.classList.add("is-ticket-visible");
        window.setTimeout(function () {
          card.classList.remove("is-ticket-visible");
        }, 4000);
      };
      card.addEventListener("click", issue);
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          issue();
        }
      });
    });

    if (window.Granim && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      new window.Granim({
        element: "#kioskGradient",
        direction: "diagonal",
        isPausedWhenNotInView: true,
        stateTransitionSpeed: 8000,
        states: {
          "default-state": {
            gradients: [
              ["#e8f4ff", "#e8fff7", "#fff4e5"],
              ["#eaf7ff", "#e7f8ee", "#fff0df"],
              ["#f0f8ff", "#eafaf4", "#fff6ea"],
            ],
            transitionSpeed: 6500,
          },
        },
      });
    }
  }

  if (page === "admin") {
    Array.prototype.forEach.call(document.querySelectorAll(".admin-service-card[data-service]"), function (card) {
      var key = card.getAttribute("data-service");
      var next = card.querySelector('[data-action="next"]');
      if (!next) return;
      next.addEventListener("click", function () {
        var state = read();
        var svc = state.services[key];
        if (svc.waiting <= 0) {
          var feedback = $("adminFeedback-" + key);
          if (feedback) {
            feedback.hidden = false;
            feedback.textContent = "No one is waiting in this queue.";
          }
          return;
        }
        svc.waiting -= 1;
        svc.called += 1;
        state.current[key] = svc.called;
        write(state);
      });
    });
  }

  window.addEventListener("storage", function (event) {
    if (event.key === KEY) render(read());
  });

  clock();
  window.setInterval(clock, 1000);
  render(read());
})();
