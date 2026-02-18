// script.js
function loadNavbar() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {

      document.getElementById("navbar-container").innerHTML = data;

      // ✅ hamburger toggle logic
      const hamburger = document.getElementById("hamburger-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      if (hamburger && mobileMenu) {

        hamburger.addEventListener("click", () => {

          mobileMenu.classList.toggle("hidden");

        });

        // optional: close menu when clicking link
        document.querySelectorAll("#mobile-menu a").forEach(link => {

          link.addEventListener("click", () => {

            mobileMenu.classList.add("hidden");

          });

        });

      }

    });
}

loadNavbar();

fetch("projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-container");

    projects.forEach((project) => {
      const techTags = project.technologies
        .map(
          (tech) =>
            `<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">${tech}</span>`,
        )
        .join("");

      const card = `
        <div class="group bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all">

          <div class="aspect-video relative overflow-hidden">
            <img src="${project.image}"
                 class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110">

            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>

          <div class="p-6">

            <h4 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              ${project.title}
            </h4>

            <div class="flex flex-wrap gap-2 mb-6">
              ${techTags}
            </div>

            <div class="flex items-center gap-4">
              <a href="lodingScreen.html"
                 class="flex-1 bg-primary text-white text-center py-2 rounded-lg font-bold text-sm">
                 View Project
              </a>
            </div>

          </div>
        </div>
      `;
      // <a href="projectDetails.html?id=${project.id}"

      container.innerHTML += card;
    });
  });

fetch("leadership.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("leadership-container");

    data.forEach((item) => {
      const div = document.createElement("div");

      div.className =
        "flex flex-col p-8 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800/20 hover:border-primary transition-all group";

      div.innerHTML = `
      
        

        <h4 class="text-xl font-bold mb-1 text-slate-900 dark:text-white">
          ${item.title}
        </h4>

        <p class="text-primary font-medium mb-3">
          ${item.event}
        </p>

        <p class="text-sm text-slate-500 mb-3">
          ${item.organization} • ${item.year}
        </p>

        <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
          ${item.description}
        </p>

      `;

      container.appendChild(div);
    });
    
  });

// TYPEWRITER EFFECT (Loop typing and deleting)
// TYPEWRITER EFFECT (guaranteed working)
function startTypewriter() {

  const element = document.getElementById("typewriter-name");

  // stop if element not found
  if (!element) {
    console.error("typewriter-name element not found");
    return;
  }

  const text = "Yadnyesh Sawant";

  let index = 0;
  let isDeleting = false;

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1500;

  function loop() {

    if (isDeleting) {
      element.textContent = text.substring(0, index - 1);
      index--;
    } else {
      element.textContent = text.substring(0, index + 1);
      index++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && index === text.length) {
      isDeleting = true;
      speed = pauseTime;
    }

    else if (isDeleting && index === 0) {
      isDeleting = false;
      speed = 500;
    }

    setTimeout(loop, speed);
  }

  loop();
}

// start AFTER page fully loads
window.addEventListener("load", startTypewriter);