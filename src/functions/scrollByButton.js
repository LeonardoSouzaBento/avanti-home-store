export function scrollByButton(container) {
  const wrapper = container.querySelector(".product-carousel-wrapper");
  const prevBtn = container.querySelector(".carousel-nav-btn.prev");
  const nextBtn = container.querySelector(".carousel-nav-btn.next");

  function getCards() {
    return Array.from(wrapper.querySelectorAll(".product-card"));
  }

  function scrollToPosition(target) {
    wrapper.scrollTo({
      left: target,
      behavior: "smooth",
    });
  }

  function handleNext() {
    const cards = getCards();
    const wrapperRect = wrapper.getBoundingClientRect();

    for (let card of cards) {
      const rect = card.getBoundingClientRect();

      // card parcialmente escondido à direita
      if (rect.right > wrapperRect.right) {
        const offset = rect.left - wrapperRect.left;
        scrollToPosition(wrapper.scrollLeft + offset);
        return;
      }
    }

    // nenhum escondido → avança "uma tela"
    scrollToPosition(wrapper.scrollLeft + wrapper.clientWidth);
  }

  function handlePrev() {
    const cards = getCards();
    const wrapperRect = wrapper.getBoundingClientRect();

    // percorre ao contrário
    for (let i = cards.length - 1; i >= 0; i--) {
      const rect = cards[i].getBoundingClientRect();

      // card parcialmente escondido à esquerda
      if (rect.left < wrapperRect.left) {
        const offset = rect.right - wrapperRect.right;
        scrollToPosition(wrapper.scrollLeft + offset);
        return;
      }
    }

    // nenhum escondido → volta "uma tela"
    scrollToPosition(wrapper.scrollLeft - wrapper.clientWidth);
  }

  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);
}