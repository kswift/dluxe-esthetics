// DLo Esthetics — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var tabs = document.querySelector(".nav-tabs");

  if (toggle && tabs) {
    toggle.addEventListener("click", function () {
      tabs.classList.toggle("open");
      var expanded = tabs.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Highlight the current page's nav link
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-tabs a").forEach(function (link) {
    var linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // Contact form: no backend on GitHub Pages, so just confirm client-side.
  // See README for how to wire this up to a real form service (e.g. Formspree).
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent =
          "Thanks for reaching out! This demo form isn't connected to email yet — " +
          "please call or DM us directly until it's wired up (see README).";
        status.classList.add("visible");
      }
      form.reset();
    });
  }
});
