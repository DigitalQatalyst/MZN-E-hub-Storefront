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

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Journey Hub",
  description:
    "Enterprise Journey a one-stop shop for services that enriches the growth of your business.",
  authors: [{ name: "Digital Qatalyst", url: "https://digitalqatalyst.com/" }],
  keywords: ["enterprise", "Khalifa Fund", "Abu dhabi", "economy", "journey"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>
              {children}
              <NProgressBar />
            </StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
