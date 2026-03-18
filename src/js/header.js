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

    btn.addEventListener("click", () => {
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

function scrollBar() {
  const list = document.querySelector(".departments-list");
  const thumb = document.querySelector(".scrollbar-y-thumb");
  const track = document.querySelector(".scrollbar-y");
  
  if (!list || !thumb) return;

  // Garantir que os elementos tenham o posicionamento correto para a simulação
  if (track) track.style.position = "relative";
  thumb.style.position = "absolute";
  thumb.style.top = "0";
  thumb.style.left = "0";
  
  const update = () => {
    const scrollHeight = list.scrollHeight;
    const clientHeight = list.clientHeight;
    const scrollTop = list.scrollTop;

    // Se não houver scroll necessário, esconde a barra
    if (scrollHeight <= clientHeight) {
      if (track) track.style.opacity = "0";
      return;
    } else {
      if (track) track.style.opacity = "1";
    }

    // Calcula a altura percentual do thumb baseada no conteúdo visível
    const heightPercent = (clientHeight / scrollHeight) * 100;
    thumb.style.height = `${heightPercent}%`;

    // Calcula a posição percentual do thumb baseada no scroll atual
    const topPercent = (scrollTop / scrollHeight) * 100;
    thumb.style.top = `${topPercent}%`;
  };

  // Escuta o evento de scroll da lista
  list.addEventListener("scroll", update);
  
  // Observa mudanças de tamanho (como redimensionamento ou carregamento de fontes/imagens)
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(list);
  }

  // Observa mudanças no DOM da lista (quando novos itens são renderizados ou removidos)
  const mutationObserver = new MutationObserver(update);
  mutationObserver.observe(list, { childList: true, subtree: true });

  // Chamada inicial para configurar o estado correto
  update();
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

  scrollBar();
}