export const products = Array.from({ length: 5 }, () => ({
  image: "./src/public/secondary-product.png",
  name: "Camiseta Masculina Algodão Peruano Gola Careca - Branca",
  isNew: true,
  discount: "12% OFF",
  oldPrice: "R$ 150,00",
  price: "R$ 143,90",
  installments: "ou 3x de R$ 47,96",
}));

export const carouselProducts = Array.from({ length: 2 }, (_, mainIndex) => ({
  id: `product-carousel-${mainIndex + 1}`,
  title: "Lançamentos",
  products: Array.from({ length: 5 }, (_, index) => ({
    id: `product-carousel-${mainIndex + 1}-product-${index + 1}`,
    image: "./src/public/secondary-product.png",
    name: "Camiseta Masculina Algodão Peruano Gola Careca - Branca",
    isNew: true,
    discount: "12% OFF",
    oldPrice: "R$ 150,00",
    price: "R$ 143,90",
    installments: "ou 3x de R$ 47,96",
  })),
}));
