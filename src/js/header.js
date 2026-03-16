export function renderNav(departments) {
  const nav = document.querySelector("#nav");

  const fastMenu = nav.querySelector(".fast-menu");
  const departmentsList = nav.querySelector(".departments-list");
  const catsMenu = nav.querySelector(".cats-menu");

  // limpa listas
  departmentsList.innerHTML = "";
  catsMenu.innerHTML = "";

  // remove links antigos do fast menu (mantendo o botão)
  fastMenu.querySelectorAll("a").forEach(el => el.remove());

  /* -------------------------
  FAST MENU (8 departamentos)
  ------------------------- */

  departments.slice(0, 7).forEach((dept) => {
    const link = document.createElement("a");

    link.href = dept.url || "#";
    link.textContent = dept.name;

    fastMenu.appendChild(link);
  });

  /* -------------------------
  MENU LATERAL
  ------------------------- */

  departments.forEach((dept, index) => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      ${dept.name}
      <svg class="svg-chevron-right"></svg>
    `;

    if (index === 0) btn.classList.add("active");

    departmentsList.appendChild(btn);

    btn.addEventListener("mouseenter", () => {
      renderCategories(dept);

      departmentsList
        .querySelectorAll("button")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
    });

    if (index === 0) renderCategories(dept);
  });

  /* -------------------------
  CATEGORIAS
  ------------------------- */
  
  function renderCategories(dept) {
    catsMenu.innerHTML = `
      <h4 class="title">${dept.name}</h4>
      <div class="ul-wrapper"></div>
    `;

    const wrapper = catsMenu.querySelector(".ul-wrapper");

    dept.cats.forEach(cat => {
      const ul = document.createElement("ul");
      // inserir título
      ul.innerHTML = `
        <li class="list-title">
          <h5 class="title">${cat.name}</h5>
        </li>
      `;

      // inserir itens
      cat.subcats.forEach(sub => {
        const li = document.createElement("li");

        li.innerHTML = `
          <a href="${sub.url || "#"}">${sub.name}</a>
        `;

        ul.appendChild(li);
      });

      wrapper.appendChild(ul);
    });
  }
}