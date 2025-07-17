// API FUNCTIONS
import api from "@utils/__api__/market-1";

import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import SearchSection from "@sections/faq/SearchSection";
import RecommendedArticles from "@sections/faq/RecommendedArticles";
import KnowledgeBase from "@sections/faq/KnowledgeBase";
import StillNeedHelp from "@sections/faq/StillNeedHelp";
import MobileNavigationBar from "@component/mobile-navigation";

export default async function Market1() {
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const mobileBrands = await api.getMobileBrands();
  const opticsBrands = await api.getOpticsBrands();

  return (
    <main>
      {/* NAVBAR AREA */}
      <MobileNavigationBar />
      <NavbarMarketplace />

      {/* search */}
      <SearchSection />

      {/* recommended articles */}
      <RecommendedArticles />

      {/* knowledge base */}
      <KnowledgeBase />

      {/* still need help */}
      <StillNeedHelp />
    </main>
  );
}
