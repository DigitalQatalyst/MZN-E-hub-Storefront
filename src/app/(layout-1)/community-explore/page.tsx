import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
// import TabBar from "@component/tab-bar/TabBar";
import TabBar from "@component/tab-bar/TabBar";
import Explore from "./components/Explore";

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
