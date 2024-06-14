import React from "react";

import EmblaCarousel from "../../ui/EmblaCarousel/EmblaCarousel";

const CoinCarousel = () => {
  const OPTIONS = {
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: true,
  };
  return <EmblaCarousel options={OPTIONS} />;
};

export default CoinCarousel;
