import Explore from "@sections/market-1/explore";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';


export default async function CommunityExplore() {

  return (
    <main>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />
      
      {/* TABBAR AREA */}
      <TabBar />
    
      <Explore />

    </main>
  );
}
