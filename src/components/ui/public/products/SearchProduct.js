"use client";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useSearchParams from "@/hook/useSearchParams";
import { searchProducts, useProductContext } from "@/contexts/ProductContext";

export default function SearchProduct() {
  const [searchParams, updateSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const data = [];

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateSearchParams({ search: search, page: 1 });
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        sx={{ width: "100%" }}
        options={data.map((option) => option.name)}
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={{ backgroundColor: "white" }}
            {...params}
            placeholder="Bạn cần tìm mua..."
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </>
  );
}
