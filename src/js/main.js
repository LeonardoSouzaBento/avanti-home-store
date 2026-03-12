import {
  footerLinkGroups,
  footerSvgs,
  products,
  icons,
  mainProductAd,
  secondaryProductAds,
} from "../data/index.js";
import {
  insertFooterLinkGroup,
  insertFooterSvgGroup,
  insertCarouselProductCards,
  insertMainProductFirstAd,
  insertMainProductSecondAds,
} from "./index.js";

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

window.addEventListener("DOMContentLoaded", () => {
  insertCarouselProductCards(products);
  insertMainProductSecondAds(secondaryProductAds);
  insertMainProductFirstAd(mainProductAd);
  insertFooterLinkGroup(footerLinkGroups);
  insertFooterSvgGroup(footerSvgs, icons);
  insertSvg();
});
