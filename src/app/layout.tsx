// src/app/layout.tsx
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@lib/registry";
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NProgressBar from "@component/NProgress";
import KfBot from "@component/bot/KfBot";
import { ModalProvider } from "@context/ModalContext";
// import MsalProviders from "./msalProviders"; // 
// import MsalProviders from "./msalProviders"; // 👈 add
import { MSALProviderWrapper as MsalProviders } from "../contexts/MsalProvider"; // 👈 add

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Journey by Khalifa fund",
  description:
    "Enterprise journey platform is a platform that provides services to entrepreneurs and startups in the UAE. It offers a range of resources, including mentorship programs, and access to funding opportunities.",
  authors: [{ name: "DigitalQatalyst", url: "https://digitalqatalyst.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react", "bonik"],
  icons: {
    icon: "/mstile-150x150.png",
    apple: "/mstile-150x150.png",
    shortcut: "/mstile-150x150.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <MsalProviders> 
            <AppProvider>
              <ModalProvider>
                <StyledContext>
                  {children}
                  <NProgressBar />
                </StyledContext>
                <KfBot />
              </ModalProvider>
            </AppProvider>
          </MsalProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
