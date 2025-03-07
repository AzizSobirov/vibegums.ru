document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section, footer"); // Include footer
  const menuLinks = document.querySelectorAll(".header__menu .menu-item a");

  function updateActiveMenu() {
    let currentSectionId = "";

    // Find the section currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjust for middle of viewport

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.id;
      }
    });

    // Special case for footer when scrolled to the bottom
    const footer = document.querySelector("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top <= window.innerHeight && footerRect.bottom >= 0) {
        currentSectionId = footer.id;
      }
    }

    // Update active class on menu items
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.parentElement.classList.add("active");
      } else {
        link.parentElement.classList.remove("active");
      }
    });
  }

  // Add scroll event listener
  window.addEventListener("scroll", updateActiveMenu);

  // Initial call to set the active menu item on page load
  updateActiveMenu();
});

// header
const header = document.querySelector(".header");
if (header) {
  const menu = header.querySelector(".header__menu");
  const menuLinks = menu.querySelectorAll(".menu-item");

  const tabs = document.querySelectorAll("#tab");
  const tabLinks = document.querySelectorAll("#tab-link");
  const tabsBody = document.querySelector(".mobile__menu-content");
  const tabsContent = tabsBody.querySelector("#content");
  const tabsContentClose = tabsBody.querySelector("#close");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const isActive = tab.classList.contains("active");
      tabs.forEach((tab) => tab.classList.remove("active"));

      if (isActive) {
        tabsBody.classList.remove("show");

        // Wait for the animation to finish before setting display to 'none'
        tabsBody.addEventListener("transitionend", function handler(event) {
          if (
            event.propertyName === "transform" &&
            !tabsBody.classList.contains("show")
          ) {
            tabsBody.style.display = "none";
            tabsContent.innerHTML = "";
            tabsBody.removeEventListener("transitionend", handler);
          }
        });
      }

      // If tab was not already active, show the content
      if (!isActive) {
        tab.classList.add("active");
        tabsBody.style.display = "flex";

        requestAnimationFrame(() => {
          tabsBody.classList.add("show");
        });

        if (tab.dataset.toggle == "menu") {
          tabsContent.innerHTML = menu.innerHTML;

          let menuLinks = tabsContent.querySelectorAll(".menu-item a");
          menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
              tabs.forEach((tab) => {
                tab.classList.remove("active");
              });

              // Add animation for hiding
              tabsBody.classList.remove("show");
              tabsBody.addEventListener(
                "transitionend",
                function handler(event) {
                  if (
                    event.propertyName === "transform" &&
                    !tabsBody.classList.contains("show")
                  ) {
                    tabsBody.style.display = "none";
                    tabsContent.innerHTML = "";
                    tabsBody.removeEventListener("transitionend", handler);
                  }
                }
              );
            });
          });
        } else {
          tabsContent.innerHTML = servicesSubMenu.outerHTML;
        }
      }
    });
  });

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add animation for hiding
      tabsBody.classList.remove("show");
      tabsBody.addEventListener("transitionend", function handler(event) {
        if (
          event.propertyName === "transform" &&
          !tabsBody.classList.contains("show")
        ) {
          tabsBody.style.display = "none";
          tabsContent.innerHTML = "";
          tabsBody.removeEventListener("transitionend", handler);
        }
      });
    });
  });

  tabsContentClose.addEventListener("click", () => {
    // Add animation for hiding
    tabsBody.classList.remove("show");
    tabsBody.addEventListener("transitionend", function handler(event) {
      if (
        event.propertyName === "transform" &&
        !tabsBody.classList.contains("show")
      ) {
        tabsBody.style.display = "none";
        tabsContent.innerHTML = "";
        tabsBody.removeEventListener("transitionend", handler);
      }
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  });
}

// init phone mask
const phoneMasks = document.querySelectorAll("input[name='phone']");
phoneMasks.forEach((input) => {
  let keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }
    let reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    )
      this.value = newValue;
    if (event.type == "blur" && this.value.length < 5) this.value = "";

    if (this.value.length == 18 || this.value.length == 0) {
      input.dataset.numbervalid = "true";
    } else {
      input.dataset.numbervalid = "false";
    }
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});

// form
const formEl = document.querySelector("#partnership form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Скоро мы с Вами свяжемся!");
});
