
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation menu
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the active navigation section while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(
  ".nav-links a[href^='#']"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);

sections.forEach((section) => observer.observe(section));

// Show a reminder for certificate links that are not added yet
document.querySelectorAll("[data-cert]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();

      alert(
        "Replace this link with your actual certificate URL before publishing."
      );
    }
  });
});


/* ===== Memberships Navigation ===== */

const membershipsLink = document.querySelector(
  'a[href="#memberships"]'
);

const membershipsSection = document.getElementById("memberships");

if (membershipsLink && membershipsSection) {
  membershipsLink.addEventListener("click", function (event) {
    event.preventDefault();

    membershipsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Update the URL hash without reloading the page
    history.replaceState(null, "", "#memberships");
  });
}

/* ===== INTERNSHIP CARD REVEAL ===== */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".internship-card");

  // Show cards normally if the browser lacks IntersectionObserver.
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => {
      card.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
    card.classList.add("reveal-ready");
    observer.observe(card);
  });
});