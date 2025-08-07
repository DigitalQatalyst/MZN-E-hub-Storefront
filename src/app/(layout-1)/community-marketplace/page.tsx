// PAGE SECTION COMPONENTS
import CommunityLanding from "@sections/market-1/CommunityLanding";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';
import Container from "@component/Container";


export default async function CommunityMarketplacePage() {

  return (
    <main>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />
      
      {/* TABBAR AREA */}
      <Container><TabBar /></Container>
      
      <CommunityLanding />

    </main>
  );
}
