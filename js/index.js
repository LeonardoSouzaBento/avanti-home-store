import { icons } from "../public/svgsIcons.js";
/* dados */
const footerSvgs = {
  "footer-social-media": [
    { name: "Instagram", slug: "instagram" },
    { name: "FaceBook", slug: "facebook" },
    { name: "YouTube", slug: "youtube" },
    { name: "TikTok", slug: "tiktok" },
  ],
  "footer-payments-method": [
    { name: "American Express", slug: "amex" },
    { name: "Mastercard", slug: "mastercard" },
    { name: "Visa", slug: "visa" },
    { name: "Hipercard", slug: "hipercard" },
    { name: "Elo", slug: "elo" },
    { name: "Diners Club", slug: "diners-club" },
    { name: "PayPal", slug: "paypal" },
    { name: "Pix", slug: "pix" },
    { name: "Boleto", slug: "boleto" },
  ],
  "footer-companies-logo": [
    { name: "Lets Encriypt", slug: "lets-encriypt" },
    { name: "PCI certified", slug: "pci-certified" },
    { name: "Avanti", slug: "footer-avanti-logo" },
    { name: "VTEX", slug: "vtex" },
  ],
};

// const departments = Array.from({ length: 12 }, (_, d) => ({
//   name: `Departamento`,
//   cats: Array.from({ length: 3 }, (_, c) => ({
//     name: `Categoria`,
//     subcats: Array.from({ length: 8 }, (_, s) => ({
//       name: `Categoria`,
//     })),
//   })),
// }));

const mainProductSecondaryAdContet = {
  title: "Loren ipsum",
  content: Array.from(
    { length: 2 },
    () =>
      `Duis consectetur metus nec lacus auctor dignissim. Mauris vitae
finibus dui. Mauris laoreet lacus ut eleifend viverra. Cras
efficitur volutpat dui, in lobortis metus lacinia sit amet. Sed
lacinia pharetra magna, vel pulvinar ligula hendrerit a. Maecenas
fringilla porttitor tortor eget lacinia. Donec sollicitudin
euismod orci, auctor fringilla magna consequat interdum. Fusce
sagittis elit a libero commodo egestas efficitur id augue.`,
  ),
};

// function insertMainProductSecondaryAdContent() {
//   //
// }

const mainProductFirstAdFeatures = Array.from({ length: 3 }, () => ({
  icon: '<svg class="svg-map-pin"></svg>',
  text: "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
}));

const products = Array.from({ length: 4 }, () => ({
  image: "./public/secondary-product.png",
  name: "Camiseta Masculina Algodão Peruano Gola Careca - Branca",
  isNew: true,
  discount: "12% OFF",
  oldPrice: "R$ 150,00",
  price: "R$ 143,90",
  installments: "ou 3x de R$ 47,96",
}));

function insertMainProductFirstAdFeatures() {
  const wrapper = document.getElementById("features-list");
  if (!wrapper) return;

  wrapper.innerHTML = mainProductFirstAdFeatures
    .map(
      (feature) => `
    <div class="feature-item repeat-feature flex-center">
      <div class="feature-icon flex-center">
        ${feature.icon}
      </div>
      <p class="feature-text">${feature.text}</p>
    </div>
  `,
    )
    .join("");
}

function insertGridProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
    <div class="product-card repeat-product">
      <div class="product-image-container">
        ${product.isNew ? '<span class="product-badge new">Novo</span>' : ""}
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/200x250/e0e0e0/000000?text=Camiseta';"/>
      </div>
      <div class="product-info">
        <h4 class="product-name">${product.name}</h4>
        <div class="product-prices">
          <div class="product-price-wrapper">
            <span class="product-old-price">${product.oldPrice}</span>
            <span class="product-price">${product.price}</span>
          </div>
          ${product.discount ? '<span class="discount flex-center">' + product.discount + "</span>" : ""}
          <span class="product-installments">${product.installments}</span>
        </div>
        <button class="product-buy-btn button-primary">Comprar</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function insertSvg() {
  const svgs = document.querySelectorAll('svg[class*="svg-"]');

  svgs.forEach((svg) => {
    const iconClass = [...svg.classList].find((c) => c.startsWith("svg-"));
    if (!iconClass) return;

    const iconName = iconClass.replace("svg-", "");
    const iconMarkup = icons[iconName];

    if (!iconMarkup) return;

    const temp = document.createElement("div");
    temp.innerHTML = iconMarkup.trim();

    const realSvg = temp.firstElementChild;

    // copiar apenas atributos que não existem no svg do HTML
    [...realSvg.attributes].forEach((attr) => {
      if (!svg.hasAttribute(attr.name)) {
        svg.setAttribute(attr.name, attr.value);
      }
    });

    // inserir paths e outros elementos internos
    svg.innerHTML = realSvg.innerHTML;
  });
}

function insertFooterSvgGroup() {
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

window.addEventListener("DOMContentLoaded", () => {
  insertMainProductFirstAdFeatures();
  insertGridProducts();
  insertSvg();
  insertFooterSvgGroup();
});
