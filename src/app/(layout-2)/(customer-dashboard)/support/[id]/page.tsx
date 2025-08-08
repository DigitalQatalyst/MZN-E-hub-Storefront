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
  const breadcumptitle = searchParams.get("breadcumptitle");
  console.log("crump title", breadcumptitle);
  const articledata = { title, description, breadcumptitle };

  return (
    <main>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />
      <FaqResponse articledata={articledata} />
    </main>
  );
};

export default HelpCenter;
