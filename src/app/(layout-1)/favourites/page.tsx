import { Fragment } from "react";
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import Tabbarfav from "@component/Tabbarfav";
import CardsFav from "@component/CardsFav";

export default function Favourites() {
  return (
    <Fragment>
      <NavbarMarketplace />
      <Box bg="#F6F6F6">
        <Tabbarfav />
        <CardsFav />
      </Box>
    </Fragment>
  );
}
