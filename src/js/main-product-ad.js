export function insertMainProductFirstAdFeatures(mainProductAdFeatures) {
  const wrapper = document.querySelector(".features-list");
  if (!wrapper) return;

  wrapper.innerHTML = mainProductAdFeatures
    .map(
      (feature) => `
    <div class="feature-item flex-center">
      <div class="feature-icon flex-center">
        ${feature.icon}
      </div>
      <p class="feature-text">${feature.text}</p>
    </div>
  `,
    )
    .join("");
}