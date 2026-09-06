document.addEventListener("DOMContentLoaded", () => {
  // Init icons + scroll animations
  if (window.lucide) lucide.createIcons();
  if (window.AOS) AOS.init({ duration: 600, once: true, offset: 40 });

  // Mobile menu toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  // Scroll progress bar
  const progressBar = document.getElementById("scroll-progress");
  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";

    if (scrollTopBtn) {
      if (scrollTop > 400) {
        scrollTopBtn.classList.remove("hidden");
        scrollTopBtn.classList.add("flex");
      } else {
        scrollTopBtn.classList.add("hidden");
        scrollTopBtn.classList.remove("flex");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth-scroll to a section when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const id = href?.replace("#", "");
      const target = id ? document.getElementById(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      }
    });
  });

  // Active nav link on scroll (scroll-spy)
  const sections = document.querySelectorAll("section[id], footer[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active-link");
      }
    });
  });
});