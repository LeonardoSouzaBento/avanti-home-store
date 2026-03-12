export function insertMainProductAbouts(ads) {
  const sections = document.querySelectorAll(".main-product2");
  ads.forEach((ad, index) => {
    const section = sections[index];
    if (!section) return;

    const paragraphs = ad.description.map((text) => `<p>${text}</p>`).join("</br>");

    section.innerHTML = `
    <div class="main-product-wrapper2">
      <div class="main-product-image-wrapper2">
        <img
          src="${ad.image}"
          class="main-product-image2"
        />
      </div>

      <div class="main-product-content2">
        <h3 class="main-product-title2">${ad.title}</h3>
        ${paragraphs}
      </div>
    </div>
    `;
  });
}

export function insertSingleMainProductAbout(data) {
  const section = document.querySelector(".main-product");

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
    <div class="main-product-wrapper">
      <div class="main-product-image-wrapper">
        <img
          src="${data.image}"
          class="main-product-image"
        />
      </div>

      <div class="main-product-content">
        <h3>${data.title}</h3>

        <div class="features-list">
          ${features}
        </div>
      </div>
    </div>
  `;
}
