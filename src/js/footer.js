export function insertFooterSvgGroup(footerSvgs, icons) {
  const parentsClass = Object.keys(footerSvgs);

  parentsClass.forEach((className) => {
    const parents = document.getElementsByClassName(className);
    const svgGroup = footerSvgs[className];

    [...parents].forEach((parent) => {
      svgGroup.forEach((svg) => {
        parent.insertAdjacentHTML("beforeend", icons[svg.slug] || "");
      });
    });
  });
}

export function insertFooterLinkGroup(groups) {
  const wrapper = document.querySelector(".footer-link-group-wrapper");

  groups.forEach((group) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "footer-link-group";

    const linksHTML = group.links
      .map((link) => {
        const extraHTML = link.extra
          ? link.extra.map((p) => `<p>${p}</p>`).join("")
          : "";

        return `
        <li>
          <h6>${link.text}</h6>
          <h5>${link.text}</h5>
          ${extraHTML}
        </li>
      `;
      })
      .join("");

    groupDiv.innerHTML = `
      <div class="ul-footer-header">
        <h5 class="footer-link-mobile">${group.title}</h5>
        <h4 class="footer-link-desktop">${group.title}</h4>
        <button>
          <svg class="svg-arrow-down"></svg>
        </button>
      </div>

      <ul class="ul-footer">
        ${linksHTML}
      </ul>
    `;

    wrapper.appendChild(groupDiv);
  });
}
