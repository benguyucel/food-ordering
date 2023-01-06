import React, { useEffect } from "react";
import Campaings from "../../components/Campaings";
import Carousel from "../../components/Carousel";
import Customers from "../../components/customer/Customers";
import About from "../../components/layouts/About";
import MenuWrapper from "../../components/product/MenuWrapper";
import Reservation from "../../components/Reservation";
import { useSession } from "next-auth/react";
import api from "../../api";

function Index({ categoryList, productList }) {

  return (
    <>
      <Carousel />
      <Campaings />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers />
    </>
  );
}

export default Index;
