"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Board from "@/components/ui/dashboard/Board";
import { AddCircle, Delete, Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import ItemProduct from "./ItemProduct";
import {
  loadingProducts,
  setLoadingFail,
  setProducts,
  setRowPage,
  useProductContext,
} from "@/contexts/ProductContext";
import { fetchListProduct } from "@/api/ProductClient";
import { useEffect } from "react";
import useSearchParams from "@/hook/useSearchParams";
import FormAddProduct from "./FormAddProduct";
import {
  loadingFail,
  loadingProductTypes,
  setProductTypes,
  useProductTypeContext,
} from "@/contexts/ProductTypeContext";
import { fetchListProductType } from "@/api/ProductTypeClient";
import { useCallback } from "react";
import AlertNotication from "@/components/AlertNotication";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "img", label: "Hình ảnh", minWidth: 100, align: "center" },
  { id: "name", label: "Sản Phẩm", minWidth: 200, align: "center" },
  { id: "type", label: "Loại", minWidth: 170, align: "center" },
  { id: "pet", label: "Pet", minWidth: 60, align: "center" },
  { id: "price", label: "Giá Bán", minWidth: 150, align: "center" },
  { id: "discount", label: "Giá Giảm", minWidth: 150, align: "center" },
  { id: "status", label: "Trạng Thái", minWidth: 50, align: "center" },
  { id: "action", label: "Sửa/Xóa", minWidth: 50, align: "center" },
];

export default function ProductList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { productState } = useProductContext();
  const { productListAdmin } = productState;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => setOpen(false);

  console.log("productListAdmin", productListAdmin);

  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <FormAddProduct open={open} handleClose={handleCloseAdd} />
      <Paper sx={{ width: "100%" }}>
        <Typography
          gutterBottom
          variant="h4"
          component={"div"}
          sx={{ padding: "20px" }}
          className="font-bold"
        >
          Danh Sách Sản Phẩm
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="mx-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={productListAdmin}
            sx={{ width: "40%" }}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Tìm Sản Phẩm...." />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            endIcon={<AddCircle />}
            className="bg-blue-500"
            onClick={handleOpenAdd}
          >
            Thêm Sản Phẩm
          </Button>
        </Stack>
        <Box height={25} />
        <Board columns={columns}>
          {productListAdmin
            // .filter((item) => )
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <ItemProduct row={row} key={row.id} index={index} />
            ))}
        </Board>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={productListAdmin.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
