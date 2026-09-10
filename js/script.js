// D'Luxe Esthetics — shared site behavior

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

  // Contact form: submit via fetch to Formspree so we can show an inline
  // confirmation instead of redirecting to Formspree's default thank-you page.
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (status) {
            if (response.ok) {
              status.textContent = "Thanks for reaching out! We'll get back to you shortly.";
            } else {
              status.textContent = "Something went wrong sending your message — please call or email us directly.";
            }
            status.classList.add("visible");
          }
          if (response.ok) {
            form.reset();
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "Something went wrong sending your message — please call or email us directly.";
            status.classList.add("visible");
          }
        });
    });
  }
});
