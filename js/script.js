/* Shaheen TV profile page controller. Public-facing JavaScript is not secret. */
const SECTION_FILES = {
  profile: "sections/profile.html",
  personalInfo: "sections/personal-info.html",
  social: "sections/social-links.html",
  websites: "sections/websites.html",
  about: "sections/about.html"
};

async function loadSection(file, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = `<p class="section-error">Section could not load. Please open this website through a web server/hosting, not directly as a file.</p>`;
  }
}

async function initializeSections() {
  await Promise.all([
    loadSection(SECTION_FILES.profile, "profileSection"),
    loadSection(SECTION_FILES.personalInfo, "personalInfoSection"),
    loadSection(SECTION_FILES.social, "socialSection"),
    loadSection(SECTION_FILES.websites, "websiteSection"),
    loadSection(SECTION_FILES.websites, "quickWebsitesSection")
  ]);
  const quick = document.getElementById("quickWebsitesSection");
  if (quick) quick.classList.add("website-mini-grid");
  const websiteSide = document.getElementById("websiteSection");
  if (websiteSide) websiteSide.querySelectorAll(".menu-item").forEach(a => a.classList.add("menu-item"));
  const avatar = document.getElementById("profileAvatar");
  if (avatar) avatar.addEventListener("error", () => {
    avatar.onerror = null;
    avatar.src = "https://i.pinimg.com/736x/99/b2/69/99b269c464132a43e6e786ccbd77a6b3.jpg";
  });
}

function createParticles() {
  const container = document.getElementById("particlesContainer");
  if (!container) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 55; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 20 + 9}s`;
    particle.style.background = `rgba(0,255,255,${Math.random() * .5 + .2})`;
    fragment.appendChild(particle);
  }
  container.appendChild(fragment);
}

function setupSidebar() {
  const hamburger = document.getElementById("hamburgerBtn");
  const panel = document.getElementById("sidebarPanel");
  const overlay = document.getElementById("sidebarOverlay");
  const close = document.getElementById("closeSidebarBtn");
  if (!hamburger || !panel || !overlay || !close) return;

  function openSide() {
    panel.classList.add("open");
    overlay.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeSide() {
    panel.classList.remove("open");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", openSide);
  close.addEventListener("click", closeSide);
  overlay.addEventListener("click", closeSide);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeSide();
  });
}

function setupTheme() {
  const dark = document.getElementById("sidebarDarkBtn");
  const light = document.getElementById("sidebarLightBtn");
  if (!dark || !light) return;

  function applyTheme(theme) {
    document.body.classList.toggle("light-mode", theme === "light");
    dark.classList.toggle("active", theme === "dark");
    light.classList.toggle("active", theme === "light");
    try { localStorage.setItem("kashif_sultan_theme", theme); } catch (_) {}
  }
  let saved = "dark";
  try { saved = localStorage.getItem("kashif_sultan_theme") || "dark"; } catch (_) {}
  applyTheme(saved);
  dark.addEventListener("click", () => applyTheme("dark"));
  light.addEventListener("click", () => applyTheme("light"));
}

function setupAboutButton() {
  const button = document.getElementById("moreAboutBtn");
  const container = document.getElementById("aboutKashifSection");
  if (!button || !container) return;

  button.addEventListener("click", async () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      container.hidden = true;
      container.innerHTML = "";
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = '<i class="fas fa-user-astronaut"></i><span>✨ MORE ABOUT KASHIF SULTAN ✨</span><i class="fas fa-chevron-down"></i>';
      return;
    }
    try {
      const response = await fetch(SECTION_FILES.about);
      if (!response.ok) throw new Error("About section could not load");
      container.innerHTML = await response.text();
      container.hidden = false;
      button.setAttribute("aria-expanded", "true");
      button.innerHTML = '<i class="fas fa-user-astronaut"></i><span>✨ HIDE PROFILE ✨</span><i class="fas fa-chevron-up"></i>';
    } catch (error) {
      container.hidden = false;
      container.innerHTML = '<div class="about-expanded">About section could not load. Please check the hosting path.</div>';
      console.error(error);
    }
  });
}

function animateNumber(element, target, suffix = "") {
  if (!element || target <= 0) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));
  const interval = setInterval(() => {
    current = Math.min(target, current + step);
    element.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 25);
}

document.addEventListener("DOMContentLoaded", async () => {
  createParticles();
  setupSidebar();
  setupTheme();
  setupAboutButton();
  document.getElementById("year").textContent = new Date().getFullYear();
  await initializeSections();
  // Set real values here only if you have verified figures to display.
  // The original counters were incorrectly configured with a target of zero.
});
