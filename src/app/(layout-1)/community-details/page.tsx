import CommunityDetails from "@sections/market-1/CommunityDetailsPage";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';
import Footer1 from "@component/footer/footer-1/Footer1";


export default async function Market1() {

  return (
    <main>
      <NavbarMarketplace />

      <TabBar />

      <CommunityDetails
        communityList={[]}
        communityCategories={[]}
      />
      <Footer1 />

    </main>
  );
}
