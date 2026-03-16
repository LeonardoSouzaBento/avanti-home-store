function renderFastMenu(departments, fastMenu, catsMenu, menuArea, departmentsMenu) {
  departments.slice(0, 7).forEach((dept) => {
    const link = document.createElement("a");

    link.href = dept.url || "#";
    link.textContent = dept.name;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      renderCategories(dept, catsMenu, menuArea);

      menuArea.style.display = "block";
      departmentsMenu.style.display = "none";
      menuArea.dataset.hideTitle = "false";

      const title = catsMenu.querySelector(".title");
      if (title) title.style.display = "block";
    });

    fastMenu.appendChild(link);
  });
}

function renderDepartmentsMenu(
  departments,
  departmentsList,
  catsMenu,
  menuArea,
) {
  departments.forEach((dept, index) => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      ${dept.name}
      <svg class="svg-chevron-right"></svg>
    `;

    if (index === 0) btn.classList.add("active");

    departmentsList.appendChild(btn);

    btn.addEventListener("mouseenter", () => {
      renderCategories(dept, catsMenu, menuArea);

      departmentsList
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
    });

    if (index === 0) {
      renderCategories(dept, catsMenu, menuArea);
    }
  });
}

function renderCategories(dept, catsMenu, menuArea) {
  const isTitleHidden = menuArea.dataset.hideTitle === "true";

  catsMenu.innerHTML = `
    <h4 class="title" style="display: ${isTitleHidden ? "none" : "block"}">${dept.name}</h4>
    <div class="ul-wrapper"></div>
  `;

  const wrapper = catsMenu.querySelector(".ul-wrapper");

  dept.cats.forEach((cat) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
      <li class="list-title">
        <h5 class="title">${cat.name}</h5>
      </li>
    `;

    cat.subcats.forEach((sub) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="${sub.url || "#"}">${sub.name}</a>
      `;

      ul.appendChild(li);
    });

    wrapper.appendChild(ul);
  });
}

export function renderNav(departments) {
  const nav = document.querySelector("#nav");

  const fastMenu = nav.querySelector(".fast-menu");
  const departmentsList = nav.querySelector(".departments-list");
  const catsMenu = nav.querySelector(".cats-menu");

  const menuArea = nav.querySelector("#menu-area");
  const catBtn = nav.querySelector(".cat-btn");
  const departmentsMenu = nav.querySelector(".departments-menu");

  menuArea.style.display = "none";

  catBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isVisible = menuArea.style.display === "block";
    const isDeptHidden = departmentsMenu.style.display === "none";

    if (isVisible && !isDeptHidden) {
      menuArea.style.display = "none";
    } else {
      menuArea.style.display = "block";
      departmentsMenu.style.display = "flex";
      menuArea.dataset.hideTitle = "true";

      const title = catsMenu.querySelector(".title");
      if (title) title.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    const isInsideFastMenu = fastMenu.contains(e.target);
    const isInsideMenuContainer = menuArea.contains(e.target);

    if (!isInsideFastMenu && !isInsideMenuContainer) {
      menuArea.style.display = "none";
    }
  });

  // limpar listas
  departmentsList.innerHTML = "";
  catsMenu.innerHTML = "";
  fastMenu.querySelectorAll("a").forEach((el) => el.remove());

  // chamadas das funções iterativas
  renderFastMenu(departments, fastMenu, catsMenu, menuArea, departmentsMenu);
  renderDepartmentsMenu(
    departments,
    departmentsList,
    catsMenu,
    menuArea
  );
}