export function insertMainProductSecondAds(data) {
  const sections = document.querySelectorAll(".main-product-second-ad");

  sections.forEach((section, index) => {
    const paragraphs = data[index].description.map((text) => `<p>${text}</p>`).join("");
    section.innerHTML = `
    <div class="main-product-second-ad-image-wrapper">
      <img
        src="${data[index].image}"
        class="main-product-second-ad-image"
      />
    </div>

    <div class="main-product-second-ad-content">
      <h3>${data[index].title}</h3>
      ${paragraphs}
    </div>
  `;
  });
}

export function insertMainProductFirstAd(data) {
  const section = document.querySelector(".main-product-first-ad");

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
    <div class="main-product-first-ad-wrapper">

      <div class="main-product-first-ad-image-wrapper">
        <img
          src="${data.image}"
          class="main-product-first-ad-image"
        />
      </div>

      <div class="main-product-first-ad-content">
        <h3>${data.title}</h3>

        <div class="features-list">
          ${features}
        </div>
      </div>
    </div>
  `;
}
