import CommunityDetails from "@sections/market-1/CommunityDetailsPage";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';


export default async function Market1() {

  return (
    <main>
      <NavbarMarketplace />

      <TabBar />

      <CommunityDetails
        communityList={[]}
        communityCategories={[]}
      />

    </main>
  );
}
