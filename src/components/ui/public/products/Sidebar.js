"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineRight, AiOutlineUp } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import {
  loadingFail,
  loadingProductTypes,
  setProductTypes,
  useProductTypeContext,
} from "@/contexts/ProductTypeContext";
import { fetchListProductType } from "@/api/ProductTypeClient";
import { Divider, Paper } from "@mui/material";

export default function SideBar() {
  const { productTypeState, dispatchProductType } = useProductTypeContext();
  const [value, setValue] = useState(0);

  const handleChangeSelectedType = (value) => {
    setValue(value);
  };

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
      <Paper elevation={1} className="h-full">
        <div className=" pt-2 rounded-xl h-full flex flex-col">
          <div className="px-2 mb-2 ">
            <h3 className="p-2 font-bold text-2xl text-center uppercase text-black border-2 shadow">
              Danh Mục
            </h3>
          </div>
          <div className="h-full">
            <div className="bg-amber-400 mb-2 rounded-lg">
              <div
                className="bg-amber-400 p-2 mb-2 border-2 border-yellow-50 drop-shadow-md rounded-lg"
                onClick={() => handleChangeSelectedType(value !== 1 ? 1 : 0)}
              >
                <div className="w-full cursor-pointer flex flex-row justify-between items-center pr-6">
                  <div className="border border-white rounded-full p-2 bg-white">
                    <Image
                      src="/icon_dog.png"
                      width={48}
                      height={48}
                      alt={"meow"}
                    />
                  </div>
                  <p className="w-full ml-2 font-bold text-white text-lg flex items-center uppercase">
                    Dành Cho Chó
                  </p>
                  <div className="flex items-center">
                    {value === 1 ? (
                      <AiOutlineDown className="size-8 text-white" />
                    ) : (
                      <AiOutlineUp className="size-8 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {value == 1 && (
                <div className="bg-amber-400 p-1">
                  {productTypeList
                    .filter((item) => item.petType === "DOG")
                    .map((item) => (
                      <div
                        className="bg-white border-2 mb-1 p-2 "
                        key={item.id}
                      >
                        <Link href={"/products"}>
                          <p className=" text-gray-700 capitalize text-sm font-semibold">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-amber-400 mb-2 rounded-lg">
              <div
                className="bg-amber-400 p-2 mb-2 border-2 border-yellow-50 drop-shadow-md rounded-lg"
                onClick={() => handleChangeSelectedType(value !== 2 ? 2 : 0)}
              >
                <div className="w-full cursor-pointer flex flex-row justify-between items-center pr-6">
                  <div className="border border-white rounded-full p-2 bg-white">
                    <Image
                      src="/icon_cat.png"
                      width={48}
                      height={48}
                      alt={"meow"}
                      color="#FFFFFF"
                    />
                  </div>
                  <p className="w-full ml-2 font-bold text-white text-lg flex items-center uppercase">
                    Dành Cho Mèo
                  </p>
                  <div className="flex items-center">
                    {value === 2 ? (
                      <AiOutlineDown className="size-8 text-white" />
                    ) : (
                      <AiOutlineUp className="size-8 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {value == 2 && (
                <div className="bg-amber-400 p-1">
                  {productTypeList
                    .filter((item) => item.petType != "DOG")
                    .map((item) => (
                      <div
                        className="bg-white border-2 mb-1 p-2 "
                        key={item.id}
                      >
                        <Link href={"/products"}>
                          <p className=" text-gray-700 capitalize text-sm font-semibold">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
