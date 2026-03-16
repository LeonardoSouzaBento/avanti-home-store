export function insertFooterSvgGroup(footerSvgs, icons) {
  const parentsClass = Object.keys(footerSvgs);

  parentsClass.forEach((className) => {
    const parents = document.querySelectorAll(`footer .${className}`);
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
      .map((link, index) => {
        const extraHTML = link.extra
          ? link.extra
              .map((p) => `<span class="extra-text">${p}</span>`)
              .join("")
          : "";

        return `
        <li>
          <h5 class="not-for-mobile li-title-desktop item-list ${link.extra ? "strong" : ""} ${link.text === "Horário de atendimento:" ? "address" : ""}">
          ${link.text}${extraHTML}
          </h5>
          <h6 class="for-mobile li-title-mobile item-list">${link.text}${extraHTML}</h6>
        </li>
      `;
      })
      .join("");

    groupDiv.innerHTML = `
      <div class="ul-footer-header">
        <h4 class="not-for-mobile title">${group.title}</h4>
        <h5 class="for-mobile title">${group.title}</h5>
        <button class="for-mobile">
          <svg class="svg-arrow-down"></svg>
        </button>
      </div>

      <ul class="ul-footer not-for-mobile">
        ${linksHTML}
      </ul>
    `;

    wrapper.appendChild(groupDiv);
  });
}
