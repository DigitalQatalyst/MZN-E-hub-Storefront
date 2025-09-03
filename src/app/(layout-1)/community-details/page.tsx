// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import GreenSME from "@sections/market-1/SME";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import TabBar from '@component/tab-bar/TabBar';


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
      <NavbarMarketplace />
      
      {/* TABBAR AREA */}
      <TabBar />
      {/* HERO CAROUSEL AREA */}
      {/* <Section1 /> */}

      {/* FLASH DEAL PRODUCTS AREA */}
      {/* <Section2 /> */}

      {/* TOP CATEGORIES AREA */}
      {/* <Section3 /> */}

      {/* TOP RATING AND BRANDS AREA */}
      {/* <Section4 /> */}

      {/* NEW ARRIVALS AREA */}
      {/* <Section5 /> */}

      {/* BIG DISCOUNT AREA */}
      {/* <Section13 /> */}

      {/* CAR LIST AREA */}
      <GreenSME carBrands={carBrands} carList={carList} />

      {/* MOBILE PHONES AREA */}
      {/* <Section7
        shops={mobileShops}
        brands={mobileBrands}
        title="Mobile Phones"
        productList={mobileList}
      /> */}

      {/* DISCOUNT BANNERS AREA */}
      {/* <Section8 /> */}

      {/* OPTICS AND WATCH AREA */}
      {/* <Section7
        shops={opticsShops}
        brands={opticsBrands}
        title="Optics / Watch"
        productList={opticsList}
      /> */}

      {/* CATEGORIES AREA */}
      {/* <Section10 /> */}

      {/* MORE PRODUCTS AREA */}
      {/* <Section11 /> */}

      {/* SERVICES AREA */}
      {/* <Section12 /> */}
    </main>
  );
}
