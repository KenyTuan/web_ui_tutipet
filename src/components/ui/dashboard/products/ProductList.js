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
// import Swal from "sweetalert2";
// import AddForm from "./AddForm";
// import EditForm from "./EditForm";
// import axios from "axios";

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
  { id: "id", label: "ID", minWidth: 60, align: "center" },
  { id: "img", label: "Hình ảnh", minWidth: 80, align: "center" },
  { id: "name", label: "Sản Phẩm", minWidth: 200, align: "center" },
  { id: "type", label: "Loại", minWidth: 170, align: "center" },
  { id: "pet", label: "Pet", minWidth: 50, align: "center" },
  { id: "price", label: "Giá", minWidth: 150, align: "center" },
  { id: "discount", label: "Giá Bán", minWidth: 150, align: "center" },
  { id: "status", label: "Trạng Thái", minWidth: 50, align: "center" },
  { id: "action", label: "Sửa/Xóa", minWidth: 50, align: "center" },
];

export default function ProductList() {
  const [searchParams, updateSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.page) || 0;
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const { productState, dispatch } = useProductContext();
  const { productList, row_page, loading, error } = productState;
  const [totalElements, setTotalElements] = useState(0);
  const { productTypeState, dispatchProductType } = useProductTypeContext();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const fetchProducts = React.useCallback(
    async (search, page, rowsPerPage) => {
      dispatch(loadingProducts());

      const response = await fetchListProduct(
        search,
        page,
        "id",
        "",
        rowsPerPage
      );
      if (response.success) {
        dispatch(setProducts(response, page, search));
        setTotalElements(response.data.totalElements);
      } else {
        dispatch(setLoadingFail(response));
      }
    },
    [dispatch]
  );

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

  useEffect(() => {
    const currentPageData = productState.productList[page];
    if (
      !currentPageData ||
      Date.now() - currentPageData.timestamp > 300000 ||
      currentPageData?.search !== search
    ) {
      fetchProducts(search, page, row_page);
    }
  }, [fetchProducts, page, productState.productList, row_page, search]);

  const handleChangePage = (event, newPage) => {
    updateSearchParams({ page: newPage });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowPage(+event.target.value));
    setPage(0);
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => setOpen(false);

  const currentPageData = productList[page] ? productList[page].data : [];

  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <FormAddProduct
        open={open}
        handleClose={handleCloseAdd}
        setSuccess={setSuccess}
        setMessage={setMessage}
        setSeverity={setSeverity}
      />
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
            options={[]}
            sx={{ width: "40%" }}
            // onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Products" />
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
          {currentPageData?.map((row) => (
            <ItemProduct row={row} key={row.id} />
          ))}
        </Board>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalElements}
          rowsPerPage={row_page}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
