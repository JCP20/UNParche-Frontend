import React from "react";
import { Carousel } from "react-responsive-carousel";

interface CarouselCustomProps {
  images: string[];
}

const CarouselCustom = ({ images }: CarouselCustomProps) => {
  return (
    <Carousel 
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      swipeable={false}
      interval={6000}
      animationHandler={"fade"}
      transitionTime = {2000}
    >
      {images.map((image, i) => (
        <div key={i}>
          <img src={image} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselCustom;
