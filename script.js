const revealTargets = document.querySelectorAll(
  ".section, .feed-demo, .compare-section, .closing-section, .benefit, .plus-visual, .scenario-visual, .scenario-card, .value-summary"
);
const stickyCta = document.querySelector(".sticky-cta");
const closingSection = document.querySelector(".closing-section");

function syncStickyCta() {
  if (!stickyCta) return;
  if (!closingSection) {
    stickyCta.classList.remove("is-visible");
    return;
  }

  const rect = closingSection.getBoundingClientRect();
  stickyCta.classList.toggle("is-visible", rect.top < window.innerHeight * 0.72);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-revealed"));
}

syncStickyCta();
window.addEventListener("scroll", syncStickyCta, { passive: true });
