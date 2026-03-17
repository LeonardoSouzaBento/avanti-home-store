export const carouselProducts = Array.from({ length: 2 }, (_, mainIndex) => ({
  id: `product-carousel-${mainIndex + 1}`,
  title: "Lançamentos",
  products: Array.from({ length: 10 }, (_, index) => ({
    id: `product-carousel-${mainIndex + 1}-product-${index + 1}`,
    image: "./src/public/secondary-product.png",
    name: `Lorem ipsum dolor sit amet consectetuer adipiscing - ${index + 1}`,
    isNew: true,
    discount: "12% OFF",
    oldPrice: "R$ 100,00",
    price: "R$ 79,90",
    installments: "10x de R$ 7,90",
  })),
}));
