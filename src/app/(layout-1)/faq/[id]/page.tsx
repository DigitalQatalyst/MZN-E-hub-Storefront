// GLOBAL CUSTOM COMPONENTS
"use client";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import { knowledgedata } from "@sections/faq/data";
import FaqResponse from "@sections/faq/FaqResponse";
import { knowledgeitems } from "@sections/faq/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const HelpCenter = () => {
  const searchParams = useSearchParams();
  const description = searchParams.get("description");
  const title = searchParams.get("title");
  // const articledata = { title, description };
  const articleid = searchParams.get("articleid");
  const itemid = searchParams.get("itemid");
  console.log("articleid", articleid);

  // get article from knowledge articles where id matches current itemid
  const article = knowledgedata?.find((articles) => articles.id === itemid);
  const selectedarticle = article?.articles.find(
    (article) => article?.id?.toString() === articleid
  );
  // create related articles from the knowledgedata and dont include the current one

  const relatedarticles = article?.articles.filter(
    (article) => article.id !== selectedarticle?.id
  );
  console.log("article", article);
  console.log("selectedarticle", selectedarticle);
  console.log("relatedarticles", relatedarticles);
  const articledata = selectedarticle;

  return (
    <main>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />
      <FaqResponse
        articledata={articledata}
        relatedarticles={relatedarticles}
        mainarticle={article}
      />
    </main>
  );
};

export default HelpCenter;
