"use client";

import Image from "next/image";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard19 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";

// API FUNCTIONS
import api from "@utils/__api__/market-1";
import { FullWrapper, Wrapper } from "@component/footer/footer-2/styles";

export default async function Section2() {
  // const products = await api.getFlashDeals();

  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4 } },
    { breakpoint: 959, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px 16px",
      }}
    >
      <Image
        src="/images/comm.png"
        alt="Empty state illustration"
        width={500}
        height={500}
        style={{
          marginBottom: "24px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        You haven’t joined any communities yet
      </h2>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#6b7280",
          marginBottom: "1.5rem",
          maxWidth: "28rem",
        }}
      >
        Start exploring communities that match your interests and needs.
      </p>
      <a
        href="/explore"
        style={{
          display: "inline-block",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "0.5rem 1.25rem",
          borderRadius: "0.375rem",
          transition: "background-color 0.2s",
        }}
      >
        Explore Communities
      </a>
    </div>
  );
}
