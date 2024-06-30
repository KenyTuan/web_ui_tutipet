import React from "react";
import SideBar from "@/components/ui/public/products/Sidebar";
import CardProduct from "@/components/ui/public/products/CardProduct";
import SearchProduct from "@/components/ui/public/products/SearchProduct";
import ProductList from "@/components/ui/public/products/ProductList";
import SelectedSortProduct from "@/components/ui/public/products/SelectedSortProduct";

export default function page() {
  return (
    <>
      <div className="p-4">
        <div className="w-full p-2 mb-4 flex flex-row justify-between items-center">
          <h2>Múa Sắm Cho Thú Cưng Của Bạn</h2>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mr-4 w-3/12">
            <SideBar />
          </div>
          <div className="w-9/12 min-h-[500px]">
            <div className="flex-row w-full flex justify-between px-2">
              <div className="w-8/12 p-2">
                <SearchProduct />
              </div>
              <div className="w-3/12 p-2">
                <SelectedSortProduct />
              </div>
            </div>

            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
}
