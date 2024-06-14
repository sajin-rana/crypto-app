import React from "react";
import EmblaCarousel from "../../ui/EmblaCarousel/EmblaCarousel";

const OPTIONS = {
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
  loop: true,
};

const CoinCarousel = () => {
  return <EmblaCarousel options={OPTIONS} />;
};

export default CoinCarousel;
