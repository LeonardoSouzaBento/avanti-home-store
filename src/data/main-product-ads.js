export const mainProductAd = {
  image: "./src/public/main-product.png",
  title: "Loren ipsum",
  features: Array.from({ length: 3 }, () => ({
    icon: '<svg class="svg-map-pin"></svg>',
    text: "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
  })),
};

export const secondaryProductAds = Array.from({ length: 2 }, (_, index) => ({
  id: index,
  image: "./src/public/main-product-2.png",
  title: "Loren ipsum",
  description: Array.from(
    { length: 2 },
    () =>
      "Duis consectetur metus nec lacus auctor dignissim. Mauris vitae finibus dui. Mauris laoreet lacus ut eleifend viverra. Cras efficitur volutpat dui, in lobortis metus lacinia sit amet. Sed lacinia pharetra magna, vel pulvinar ligula hendrerit a. Maecenas fringilla porttitor tortor eget lacinia. Donec sollicitudin euismod orci, auctor fringilla magna consequat interdum. Fusce sagittis elit a libero commodo egestas efficitur id augue.",
  ),
}));
