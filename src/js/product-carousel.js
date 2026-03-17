import { applyMouseScrollX, applyResizeCount } from "../functions/index.js";

export function insertCarouselProducts(carousels) {
  carousels.forEach((carousel) => {
    const section = document.querySelector(`#${carousel.id}`);
    if (!section) return;

    const productsHTML = carousel.products
      .map(
        (product) => `
        <div class="product-card">
          <div class="product-image-container">
            ${product.isNew ? '<span class="product-badge new">Novo</span>' : ""}
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-image"
              onerror="this.src='https://placehold.co/200x250/e0e0e0/000000?text=Camiseta';"
            />
          </div>

          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>

            <div>
              <div class="product-price-container">
                <div class="product-price-wrapper">
                  <span class="product-old-price">${product.oldPrice}</span>
                  <span class="product-price">${product.price}</span>
                </div>
                ${
                  product.discount
                    ? `<span class="discount flex-center">${product.discount}</span>`
                    : ""
                }
              </div>

              <span class="product-installments">
                Ou em até 
                <span>${product.installments}</span>
              </span>
            </div>

            <button class="product-buy-btn btn-primary">
              Comprar
            </button>
          </div>
        </div>
      `,
      )
      .join("");

    section.innerHTML = `
      <div class="product-carousel-header">
        <h2 class="title">${carousel.title}</h2>
        <a href="#" class="view-all-link">
          Ver todos <span class="view-all-indicator"></span>
        </a>
      </div>

      <div class="product-carousel-container">
        <button class="carousel-nav-btn prev">
          <svg class="svg-arrow-left"></svg>
        </button>
        <button class="carousel-nav-btn next">
          <svg class="svg-arrow-right"></svg>
        </button>
        <div class="product-carousel-wrapper">
          ${productsHTML}
        </div>
      </div>

      <div class="flex-center" style="margin-top: 16px; gap: 4px;">
        <span class="pagination-span active"></span>
        <span class="pagination-span"></span>
        <span class="pagination-span"></span>
      </div>
    `;
  });
}

export function initializeCarousels() {
  const parents = document.getElementsByClassName("product-carousel-container");
  const wrappers = document.getElementsByClassName("product-carousel-wrapper");

  for (let i = 0; i < parents.length; i++) {
    const scroll = applyMouseScrollX(parents[i], wrappers[i], {
      scrollStart: "start",
    });

    applyResizeCount(() => {
      scroll.update();
    });
  }
}
