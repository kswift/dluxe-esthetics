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

  // Homepage hero: image slider with arrows, dots, and auto-advance
  var heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 1) {
    var heroHome = document.querySelector(".hero-home");
    var dotsContainer = document.querySelector(".hero-slider-dots");
    var prevBtn = document.querySelector(".hero-slider-prev");
    var nextBtn = document.querySelector(".hero-slider-next");
    var currentSlide = 0;
    var dots = [];
    var autoTimer;

    heroSlides.forEach(function (slide, i) {
      if (dotsContainer) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-slider-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Go to image " + (i + 1));
        dot.addEventListener("click", function () {
          goToSlide(i);
          restartAutoTimer();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    });

    function goToSlide(index) {
      heroSlides[currentSlide].classList.remove("active");
      dots[currentSlide] && dots[currentSlide].classList.remove("active");
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentSlide].classList.add("active");
      dots[currentSlide] && dots[currentSlide].classList.add("active");
      if (heroHome) {
        heroHome.classList.toggle("no-tint", heroSlides[currentSlide].getAttribute("data-no-tint") === "true");
      }
    }

    function restartAutoTimer() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToSlide(currentSlide - 1);
        restartAutoTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToSlide(currentSlide + 1);
        restartAutoTimer();
      });
    }

    restartAutoTimer();

    // Click a slide to pop it out full-size in a lightbox
    var lightbox = document.getElementById("heroLightbox");
    var lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
    var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

    function openLightbox(src) {
      var fullSrc = src || heroSlides[currentSlide].getAttribute("data-full");
      if (lightbox && lightboxImg && fullSrc) {
        lightboxImg.src = fullSrc;
        lightbox.classList.add("open");
      }
    }

    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove("open");
      }
    }

    heroSlides.forEach(function (slide) {
      slide.addEventListener("click", function () {
        openLightbox();
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox();
      }
    });

    // Automatically pop out the Grand Opening flyer once per browser session
    if (!sessionStorage.getItem("seenGrandOpening")) {
      openLightbox("assets/grand-opening.png");
      sessionStorage.setItem("seenGrandOpening", "true");
    }
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
