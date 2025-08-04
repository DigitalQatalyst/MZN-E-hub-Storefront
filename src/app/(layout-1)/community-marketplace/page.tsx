
import CommunityDirectory from "@sections/market-1/CommunityDirectory";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';


export default async function Market1() {

  return (
    <main>

      <NavbarMarketplace />

      <TabBar />

      <CommunityDirectory communityList={[]}
        communityCategories={[]} />


    </main>
  );
}
