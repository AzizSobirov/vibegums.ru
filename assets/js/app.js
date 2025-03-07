document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section, footer"); // Include footer
  const menu = document.querySelector(".header__menu");
  const menuLinks = menu.querySelectorAll(".menu-item a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          menuLinks.forEach((link) =>
            link.parentElement.classList.remove("active")
          );

          const activeLink = document.querySelector(
            `.menu-item a[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.parentElement.classList.add("active");
            menu.style.setProperty("--dot-position", `${index + 1 + 60}px`);
          }
        }
      });
    },
    { rootMargin: "0px 0px -50% 0px", threshold: 0.1 } // Adjusted settings
  );

  sections.forEach((section) => observer.observe(section));
});
