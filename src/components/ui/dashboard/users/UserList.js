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
import {
  loadingFail,
  loadingProductTypes,
  setProductTypes,
  useProductTypeContext,
} from "@/contexts/ProductTypeContext";
import { fetchListProductType } from "@/api/ProductTypeClient";
import { useCallback } from "react";
import AlertNotication from "@/components/AlertNotication";
import ItemUser from "./ItemUser";
import { useUserContext } from "@/contexts/UserContext";
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

export default function UserList() {
  const [page, setPage] = useState(0);
  const { userState, dispatchUser } = useUserContext();
  const { userListAdmin } = userState;
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
  console.log("userListAdmin", userListAdmin);

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <Typography
          gutterBottom
          variant="h4"
          component={"div"}
          sx={{ padding: "20px" }}
          className="font-bold"
        >
          Danh sách người dùng
        </Typography>
        <Divider />
        <Box height={25} />
        <Board columns={columns}>
          {userListAdmin
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <ItemUser row={row} key={row.id} index={index} />
            ))}
        </Board>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={userListAdmin.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
