// script.js
function loadNavbar() {
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
    });
}

loadNavbar();


fetch("projects.json")
  .then(response => response.json())
  .then(projects => {

    const container = document.getElementById("projects-container");

    projects.forEach(project => {

      const techTags = project.technologies.map(tech =>
        `<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">${tech}</span>`
      ).join("");

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
              <a href="projectDetails.html?id=${project.id}"
                 class="flex-1 bg-primary text-white text-center py-2 rounded-lg font-bold text-sm">
                 View Project
              </a>
            </div>

          </div>
        </div>
      `;

      container.innerHTML += card;

    });

  });