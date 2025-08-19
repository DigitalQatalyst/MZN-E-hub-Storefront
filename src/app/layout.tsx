// app/layout.tsx (SERVER component)
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import StyledComponentsRegistry from "@lib/registry";

// third-party CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ClientProviders from "../contexts/ClientProvider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Journey by Khalifa fund",
  description:
    "Enterprise journey platform is a platform that provides services to entrepreneurs and startups in the UAE. It offers a range of resources, including mentorship programs, and access to funding opportunities.",
  authors: [{ name: "DigitalQatalyst", url: "https://digitalqatalyst.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react", "bonik"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <ClientProviders>{children}</ClientProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
