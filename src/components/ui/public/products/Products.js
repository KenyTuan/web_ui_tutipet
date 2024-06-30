import React, { useState } from "react";
import CardProduct from "./CardProduct";

export default function Products({ productList }) {
  return (
    <>
      {productList.map((item) => (
        <CardProduct key={item.id} product={item} />
      ))}
    </>
  );
}
