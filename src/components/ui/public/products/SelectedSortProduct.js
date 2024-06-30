"use client";
import useSearchParams from "@/hook/useSearchParams";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function SelectedSortProduct() {
  const [searchParams, updateSearchParams] = useSearchParams();
  const sortBy = searchParams.sortBy ?? "";
  const sortOrder = searchParams.sortOrder ?? "";
  const paramSort = sortBy + "-" + sortOrder;
  const [sort, setSort] = useState(paramSort == "-" ? "name-asc" : paramSort);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    const sortParams = event.target.value.split("-");
    updateSearchParams({ sortBy: sortParams[0], sortOrder: sortParams[1] });
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">sắp xếp theo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={sort}
          id="demo-simple-select"
          label="sắp xếp theo"
          onChange={handleChangeSort}
        >
          <MenuItem value={"name-asc"}>Tên từ a-z</MenuItem>
          <MenuItem value={"name-desc"}>Tên từ z-a</MenuItem>
          <MenuItem value={"price-asc"}>Giá Tăng Dần</MenuItem>
          <MenuItem value={"price-desc"}>Giá Giảm Dần</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
