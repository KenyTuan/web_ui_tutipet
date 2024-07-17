import React from "react";
import SideBar from "@/components/ui/public/products/Sidebar";
import CardProduct from "@/components/ui/public/products/CardProduct";
import SearchProduct from "@/components/ui/public/products/SearchProduct";
import ProductList from "@/components/ui/public/products/ProductList";
import SelectedSortProduct from "@/components/ui/public/products/SelectedSortProduct";
import { Paper } from "@mui/material";

export default function page() {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div className="mr-4 w-3/12">
            <SideBar />
          </div>
          <div className="w-9/12 ">
            <Paper elevation={1}>
              <div className="min-h-[850px]">
                <div className="p-4">
                  <div className="flex-row w-full flex justify-between px-2">
                    <div className="w-8/12 p-2">
                      <SearchProduct />
                    </div>
                    <div className="w-3/12 p-2">
                      <SelectedSortProduct />
                    </div>
                  </div>
                </div>
                <ProductList />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
