"use client";

import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import { colorOptions } from "interfaces";
import StyledRating from "./styles";
import Star from "./Star";

// ==============================================================
export interface RatingProps {
  value?: number;
  outof?: number;
  readOnly?: boolean;
  className?: string;
  color?: colorOptions ;
  colorEmpty?: string;
  style?: CSSProperties;
  onChange?: (value: number) => void;
  size?: "small" | "medium" | "large";
}
// ==============================================================

import { FaStar } from "react-icons/fa"; // Or your custom icon set
import NextImage from "@component/NextImage";
import star from "../../../public/images/star.svg";

const GreyStar = ({ onClick }: { onClick?: () => void }) => (
  // <FaStar
  //   color="#c0c0c0"
  //   style={{ cursor: onClick ? "pointer" : "default" }}
  //   onClick={onClick}
  // />
  // <NextImage src={star} alt="star" width={60} height={60} onClick={onClick} style={{cursor : onClick ? "pointer" : "default"}} />

  <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="star" clip-path="url(#clip0_1275_218)">
  <path id="Vector" d="M6.22435 1.18678L7.71164 4.19986L11.0376 4.68599L8.63096 7.03003L9.19892 10.3415L6.22435 8.77723L3.24978 10.3415L3.81774 7.03003L1.41113 4.68599L4.73707 4.19986L6.22435 1.18678Z" stroke="#C1CDD7" stroke-width="1.54023" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_1275_218">
  <rect width="11.5517" height="11.5517" fill="white" transform="translate(0.448242 0.224136)"/>
  </clipPath>
  </defs>
  </svg>
);



export default function Rating({
  onChange,
  value = 0,
  outof = 5,
  size = "medium",
  readOnly = true,
  color = "secondary",
  ...props
}: RatingProps) {
  const [state, setState] = useState<number>(value as number);

  let fullStar = parseInt(state.toString());
  let halfStar = Math.ceil(state - fullStar);
  let emptyStar = (outof as number) - Math.ceil(state);
  let starList = [];

  const handleStarClick = (inputValue: any) => {
    if (!readOnly) {
      setState(inputValue);
      if (onChange) onChange(inputValue);
    }
  };

  useEffect(() => setState(value as number), [value]);

  for (let i = 0; i < fullStar; i++) {
    let inputValue = i + 1;

    starList.push(
      <Star key={i} value={5} color={color} onClick={() => handleStarClick(inputValue)} />
    );
  }

  // for (let i = 0; i < halfStar; i++) {
  //   let inputValue = i + fullStar + 1;

  //   starList.push(
  //     <Star
  //       outof={10}
  //       color={color}
  //       key={inputValue}
  //       value={((state as number) - fullStar) * 10}
  //       onClick={() => handleStarClick(inputValue)}
  //     />
  //   );
  // }

  for (let i = 0; i < halfStar; i++) {
    let inputValue = i + fullStar + 1;
  
    starList.push(
      <Star
        outof={5}
        key={inputValue}
        value={((state as number) - fullStar) * 5}
        color={color} // grey for half-filled
        onClick={() => handleStarClick(inputValue)}
      />
    );
  }
  for (let i = 0; i < emptyStar; i++) {
    let inputValue = i + halfStar + fullStar + 1;
  
    starList.push(
      // <Star
      //   key={inputValue}
      //   value={0}
      //   color={color} // grey for empty
      //   onClick={() => handleStarClick(inputValue)}
      // />
      <GreyStar onClick={() => handleStarClick(inputValue)} />
    );
  }
  

  // for (let i = 0; i < emptyStar; i++) {
  //   let inputValue = i + halfStar + fullStar + 1;

  //   starList.push(
  //     <Star key={inputValue} value={0} color={color} onClick={() => handleStarClick(inputValue)} />
  //   );
  // }

  return (
    <StyledRating color={color} value={state} readOnly={readOnly} size={size} {...props} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      {starList}
    </StyledRating>
  );
}
