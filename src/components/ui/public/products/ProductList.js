"use client";
import React, { useCallback, useEffect, useState } from "react";
import Products from "./Products";
import { usePathname, useRouter } from "next/navigation";
import { Pagination, PaginationItem } from "@mui/material";
import {
  SET_PAGE,
  loadingProducts,
  searchProducts,
  setLoadingFail,
  setProducts,
  useProductContext,
} from "@/contexts/ProductContext";
import ProductClient from "@/api/ProductClient";
import useSearchParams from "@/hook/useSearchParams";

export default function ProductList() {
  const [searchParams, updateSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.page) || 1;
  const [page, setPage] = useState(initialPage);
  const search = searchParams.search ?? "";
  const sortBy = searchParams.sortBy ?? "";
  const sortOrder = searchParams.sortOrder ?? "";
  const { productState, dispatch } = useProductContext();
  const { productList, loading, error, total_pages } = productState;

  const handleChange = (event, value) => {
    updateSearchParams({ page: value });
    setPage(value);
  };

  const fetchProducts = useCallback(
    async (search, page, sortBy, sortOrder) => {
      const productClient = new ProductClient();
      dispatch(loadingProducts());

      const response = await productClient.fetchList(
        search,
        page,
        sortBy,
        sortOrder
      );
      if (response.success) {
        dispatch(setProducts(response, page, search, sortBy, sortOrder));
      } else {
        dispatch(setLoadingFail(response));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const currentPageData = productState.productList[page];
    if (
      !currentPageData ||
      Date.now() - currentPageData.timestamp > 300000 ||
      currentPageData?.search !== search ||
      currentPageData?.sortBy !== sortBy ||
      currentPageData?.sortOrder !== sortOrder
    ) {
      fetchProducts(search, page, sortBy, sortOrder);
    }
  }, [
    fetchProducts,
    page,
    productState.productList,
    search,
    sortBy,
    sortOrder,
  ]);

  const currentPageData = productList[page] ? productList[page].data : [];
  console.log("productList", productList);

  return (
    <>
      {loading ? (
        <div className="text-lg font-semibold text-center">{"Loading..."}</div>
      ) : currentPageData.length != 0 ? (
        <>
          <div className="p-2 grid grid-cols-4 gap-6 mb-4">
            <Products productList={currentPageData ? currentPageData : []} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              page={page}
              count={total_pages}
              onChange={handleChange}
              renderItem={(item) => <PaginationItem {...item} />}
            />
          </div>
        </>
      ) : (
        <div className="w-9/12 text-2xl font-bold content-center text-center min-h-[500px]">
          Xin lỗi! Không thể tìm thấy sản phẩm
        </div>
      )}
    </>
  );
}
