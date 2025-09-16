"use client";

import { PropsWithChildren, forwardRef } from "react";
import SlickCarousel, { Settings } from "react-slick";
import { CSSObject } from "styled-components";
// LOCAL CUSTOM COMPONENTS
import CarouselDots2 from "../carousel2/CarouselDots2";
import CarouselArrows2 from "../carousel2/CarouselArrows2";

// STYLED COMPONENT
import { RootStyle } from "./styles2";

// ==============================================================
interface Props extends PropsWithChildren, Settings {
  dotColor?: string;
  spaceBetween?: number;
  dotStyles?: CSSObject;
  arrowStyles?: CSSObject;
}
// ==============================================================

const Carousel2 = forwardRef<SlickCarousel, Props>((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = { marginTop: "2rem" },
    ...others
  } = props;

  const settings: Settings = {
    dots,
    arrows,
    slidesToShow,
    ...CarouselArrows2({ style: arrowStyles }),
    ...CarouselDots2({ dotColor, style: dotStyles }),
    ...others,
  };

  return (
    <RootStyle space={spaceBetween}>
      <SlickCarousel ref={ref} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>
  );
});

export default Carousel2;
