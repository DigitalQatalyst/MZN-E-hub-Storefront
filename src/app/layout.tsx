import './globals.css'; // adjust the path if your CSS file is elsewhere
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// THEME PROVIDER
import StyledComponentsRegistry from "@lib/registry";
// APP PROVIDER
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
// THIRD PARTY CSS FILE
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NProgressBar from "@component/NProgress";
import { Toaster } from "@component/ui/Sonner";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Journey by Khalifa fund",
  description:
    "Enterprise journey platform is a platform that provides services to entrepreneurs and startups in the UAE. It offers a range of resources, including mentorship programs, and access to funding opportunities.",
  authors: [{ name: "DigitalQatalyst", url: "https://digitalqatalyst.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react", "bonik"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
      suppressHydrationWarning
      className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>
              {children}
              <NProgressBar />
              <Toaster />
            </StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
