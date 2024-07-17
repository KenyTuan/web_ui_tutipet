import ProductDetail from "@/components/ui/public/products/product_detail/ProductDetail";
import React from "react";
import Link from "next/link";

export default function page({ params, searchParams }, parent) {
  const nameProduct = decodeURIComponent(params.name);
  const titleProduct = nameProduct.replace(/ /g, "_");
  return (
    <>
      <div className="px-36 min-h-[900px]">
        <div className="bg-white min-h-[848px] py-2 px-8">
          <ProductDetail pathParam={params.name} />
        </div>
      </div>
    </>
  );
}
