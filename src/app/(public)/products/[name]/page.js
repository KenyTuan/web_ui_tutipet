import ProductDetail from "@/components/ui/public/products/product_detail/ProductDetail";
import React from "react";
import Link from "next/link";

export default function page({ params, searchParams }, parent) {
  const nameProduct = decodeURIComponent(params.name);
  const titleProduct = nameProduct.replace(/ /g, "_");
  return (
    <>
      <div className="px-36 min-h-[900px]">
        <div className="flex flex-row justify-start items-center p-2 mb-2">
          <Link href={"/products"}>
            <p className="italic text-blue-300 font-semibold text-lg hover:border-b-blue-300 hover:border-b-2">
              /Sản Phẩm
            </p>
          </Link>
          <div>
            <p className="italic capitalize font-semibold text-lg">
              /{titleProduct}
            </p>
          </div>
        </div>
        <div className="bg-white min-h-[848px] py-2 px-8">
          <ProductDetail pathParam={params.name} />
        </div>
      </div>
    </>
  );
}
