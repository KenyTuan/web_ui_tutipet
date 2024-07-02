"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import {
  loadingFail,
  loadingProductTypes,
  setProductTypes,
  useProductTypeContext,
} from "@/contexts/ProductTypeContext";
import { fetchListProductType } from "@/api/ProductTypeClient";

export default function SideBar() {
  const { productTypeState, dispatchProductType } = useProductTypeContext();

  const fetchProductTypes = useCallback(async () => {
    dispatchProductType(loadingProductTypes());

    const response = await fetchListProductType();
    if (response.success) {
      dispatchProductType(setProductTypes(response));
    } else {
      dispatchProductType(loadingFail(response));
    }
  }, [dispatchProductType]);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const { productTypeList } = productTypeState;

  return (
    <>
      <div className="p-4 bg-[#ca9c7c89] rounded-xl max-h-[250px]">
        <h3 className="font-bold text-2xl text-center uppercase mb-2 text-white">
          Danh Mục
        </h3>
        <hr className="mb-2" />
        <div className="group p-2  mb-2 flex flex-row justify-between item-center">
          <div className=" w-full cursor-pointer hover:border-1 flex flex-row justify-between item-center pr-6">
            <div className="border border-white rounded-full p-2 bg-white">
              <Image src="/icon_dog.png" width={48} height={48} alt={"meow"} />
            </div>
            <p className="w-full ml-2 font-bold text-white text-lg flex items-center">
              Sản Phẩm Cho Chó
            </p>
            <div className="flex items-center">
              <AiOutlineRight className="size-8 text-white" />
            </div>
          </div>

          <div className="absolute w-7/12 min-h-64 bg-white z-10 translate-x-1/3 invisible group-hover:visible duration-100">
            <div className="grid grid-cols-5 gap-4 p-2">
              {productTypeList
                .filter((item) => item.petType === "DOG")
                .map((item) => (
                  <div className="py-1 px-4" key={item.id}>
                    <Link href={"/products"}>
                      <p className="text-center hover:border-b-2 border-gray-500">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="p-2  mb-2 flex flex-row justify-between item-center group">
          <div className="w-full cursor-pointer hover:border-1 flex flex-row justify-between item-center pr-6">
            <div className="border border-white rounded-full p-2 bg-white">
              <Image
                src="/icon_cat.png"
                width={48}
                height={48}
                alt={"meow"}
                color="#FFFFFF"
              />
            </div>
            <p className="w-full ml-2 font-bold text-white text-lg flex items-center">
              Sản Phẩm Cho Mèo
            </p>
            <div className="flex items-center">
              <AiOutlineRight className="size-8 text-white" />
            </div>
          </div>

          <div className="absolute w-7/12 min-h-64 bg-white z-10 translate-x-1/3 invisible group-hover:visible duration-100">
            <div className="grid grid-cols-5 gap-4 p-2">
              {productTypeList
                .filter((item) => item.petType != "DOG")
                .map((item) => (
                  <div className="py-1 px-2" key={item.id}>
                    <Link href={"/products"}>
                      <p className="text-center hover:border-b-2 border-gray-500">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
