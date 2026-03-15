export function insertMainProductSections(data) {
  const sections = data.map((content) => document.getElementById(content.id));
  
  sections.forEach((section, index) => {
    const content = data[index];
    if (!section) return;

    const paragraphs = content.description
      .map((text) => `<p>${text}</p>`)
      .join("</br>");

    section.innerHTML = `
    <div class="main-product-wrapper">
      <div class="main-product-image-wrapper">
        <img
          src="${content.image}"
          class="main-product-image"
        />
      </div>

      <div class="main-product-content">
        <h3 class="main-product-title">${content.title}</h3>
        ${paragraphs}
      </div>
    </div>
    `;
  });
}

export function insertMainProductSingleSection(data) {
  const section = document.querySelector("#main-product");

  const features = data.features
    .map(
      (feature) => `
      <div class="feature-item">
        <div class="feature-icon flex-center">${feature.icon}</div>
        <p class="feature-text">${feature.text}</p>
      </div>
    `,
    )
    .join("");

  section.innerHTML = `
    <div id="main-product-wrapper">
      <div id="main-product-image-wrapper">
        <img src="${data.image}"/>
      </div>

      <div id="main-product-content">
        <h3 id="main-product-title">${data.title}</h3>

        <div id="features-list">
          ${features}
        </div>
      </div>
    </div>
  `;
}
