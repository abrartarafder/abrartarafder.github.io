/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

// Get the theme button and add a click event listener
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleDarkMode);

// Function to toggle dark mode
function toggleDarkMode() {
  // Toggle the dark mode class on the body element
  document.body.classList.toggle("dark-mode");

  // Toggle the moon and sun icons
  if (document.body.classList.contains("dark-mode")) {
    themeButton.classList.remove("bx-moon");
    themeButton.classList.add("bx-sun");
  } else {
    themeButton.classList.remove("bx-sun");
    themeButton.classList.add("bx-moon");
  }
}
    // Array of different roles
    const roles = ['Computer Science Student', 'Data Analyst', 'Graphic and Web Designer', 'Digital Marketer', 'Tech Enthusiast']; // Add more roles as needed
    // Initialize Typed.js instance
    const type = new Typed('#roleDescription', {
        strings: roles,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });


/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".home__scroll", { delay: 200 });
sr.reveal(".home__img", { origin: "right", delay: 400 });

/*SCROLL ABOUT*/
sr.reveal(".about__img", { delay: 500 });
sr.reveal(".about__subtitle", { delay: 300 });
sr.reveal(".about__profession", { delay: 400 });
sr.reveal(".about__text", { delay: 500 });
sr.reveal(".about__social-icon", { delay: 600, interval: 200 });

/*SCROLL SKILLS*/
sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__name", { distance: "20px", delay: 50, interval: 100 });
sr.reveal(".skills__img", { delay: 400 });

/*SCROLL PORTFOLIO*/
sr.reveal(".portfolio__img", { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal(".contact__subtitle", {});
sr.reveal(".contact__text", { interval: 200 });
sr.reveal(".contact__input", { delay: 400 });
sr.reveal(".contact__button", { delay: 600 });
