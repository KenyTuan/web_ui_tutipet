"use client";
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, CardActionArea, CardMedia, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import FormUpdateProduct from "./FormUpdateProduct";
import { deleteProduct, updateProductStatus } from "@/api/ProductClient";
import {
  acctionDeleteProduct,
  acctionUpdateProduct,
  useProductContext,
} from "@/contexts/ProductContext";
import Swal from "sweetalert2";

export default function ItemProduct({ row, index }) {
  const { dispatch } = useProductContext();
  const [open, setOpen] = useState(false);
  const handleCloseUpdate = () => setOpen(false);
  const handleOpenUpdate = () => setOpen(true);

  const handleClickDeleted = (item) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác Nhận",
    }).then((result) => {
      if (result.value) {
        deleteProduct(item.id).then((res) => {
          if (res.success) {
            Swal.fire(
              "Thông Báo!",
              `Hệ thống đã xóa dữ liệu này.`,
              "success"
            ).then(dispatch(acctionDeleteProduct(item.id)));
            return;
          }
          Swal.fire("Thông Báo!", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
        });
      }
    });
  };

  const handleChangeStatus = (action) => {
    updateProductStatus(row.id, action ? "DISABLED" : "ENABLED").then((res) => {
      console.log("res", res);
      if (res.success) {
        Swal.fire(
          "Thông Báo!",
          `Hệ thống đã ${action ? "ẩn" : "hiện"} dữ liệu này.`,
          "success"
        ).then(dispatch(acctionUpdateProduct(res, index)));
        return;
      }
      Swal.fire("Thông Báo!", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
    });
  };

  return (
    <>
      <FormUpdateProduct
        item={row}
        open={open}
        handleClose={handleCloseUpdate}
        index={index}
      />
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell key={"img"} align={"center"} className="border-r-2">
          <CardActionArea>
            <CardMedia
              src={row?.image ?? "/product.jpg"}
              component="img"
              height={12}
              style={{ height: "8rem", objectFit: "contain" }}
              alt="hình cún con"
            />
          </CardActionArea>
        </TableCell>
        <TableCell key={"name"} align={"center"} className="border-r-2">
          {row?.name}
        </TableCell>
        <TableCell key={"type"} align={"center"} className="border-r-2">
          {row?.type?.name}
        </TableCell>
        <TableCell key={"pet"} align={"center"} className="border-r-2">
          {row?.type?.petTypes === "CAT" ? "Mèo" : "Chó"}
        </TableCell>
        <TableCell key={"price"} align={"center"} className="border-r-2">
          {`${row?.price}.000 VND`}
        </TableCell>
        <TableCell key={"discount"} align={"center"} className="border-r-2">
          {row?.discount}.000 VND
        </TableCell>
        <TableCell key={"status"} align={"center"} className="border-r-2">
          {row.status == "ENABLED" ? (
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-sm"
              onClick={() => handleChangeStatus(true)}
            >
              Hiện
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => handleChangeStatus(false)}
            >
              Ẩn
            </Button>
          )}
        </TableCell>
        <TableCell key={"action"} align="left" className="border-r-2">
          <Stack spacing={2} direction="row">
            <Edit
              style={{
                fontSize: "20px",
                color: "blue",
                cursor: "pointer",
              }}
              className="cursor-pointer"
              onClick={handleOpenUpdate}
            />
            <Delete
              style={{
                fontSize: "20px",
                color: "darkred",
                cursor: "pointer",
              }}
              onClick={() => handleClickDeleted(row)}
            />
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
