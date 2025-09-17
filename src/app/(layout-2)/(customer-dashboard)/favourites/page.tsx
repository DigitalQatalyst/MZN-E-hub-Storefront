"use client";

import React, { createContext, useState } from "react";
import { Fragment } from "react";
import Box from "@component/Box";
import Tabbarfav from "@component/Tabbarfav";
import CardsFav from "@component/CardsFav";

export default function Favourites() {
  return (
    <Fragment>
      <Box bg="#F6F6F6">
        <Tabbarfav />
        <CardsFav />
      </Box>
    </Fragment>
  );
}
