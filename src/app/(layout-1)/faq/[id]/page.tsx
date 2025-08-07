// GLOBAL CUSTOM COMPONENTS
"use client";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import FaqResponse from "@sections/faq/FaqResponse";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const HelpCenter = () => {
  const searchParams = useSearchParams();
  const description = searchParams.get("description");
  const title = searchParams.get("title");
  const articledata = { title, description };
  return (
    <main>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />
      <FaqResponse articledata={articledata} />
    </main>
  );
};

export default HelpCenter;
