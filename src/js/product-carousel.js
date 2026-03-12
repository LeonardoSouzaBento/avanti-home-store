export function insertCarouselProducts(carousels) {
  carousels.forEach((carousel) => {
    const section = document.querySelector(`.${carousel.id}`);
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
            <h4 class="product-name">${product.name}</h4>

            <div class="product-prices">
              <div class="product-price-wrapper">
                <span class="product-old-price">${product.oldPrice}</span>
                <span class="product-price">${product.price}</span>
              </div>

              ${
                product.discount
                  ? `<span class="discount flex-center">${product.discount}</span>`
                  : ""
              }

              <span class="product-installments">${product.installments}</span>
            </div>

            <button class="product-buy-btn button-primary">
              Comprar
            </button>
          </div>
        </div>
      `,
      )
      .join("");

    section.innerHTML = `
      <div class="product-carousel-header">
        <h2>${carousel.title}</h2>
        <a href="#" class="view-all">
          Ver todos <span class="view-all-indicator"></span>
        </a>
      </div>

      <div class="product-carousel-container">
        <div class="product-carousel-wrapper">
          ${productsHTML}
        </div>
      </div>
    `;
  });
}