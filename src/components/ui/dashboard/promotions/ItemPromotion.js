"use client";
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, CardActionArea, CardMedia, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AlertNotication from "@/components/AlertNotication";
import { deleteProduct } from "@/api/ProductClient";
import { setProduct, useProductContext } from "@/contexts/ProductContext";
import Swal from "sweetalert2";
import FormUpdatePromotion from "./FormUpdatePromotion";

export default function ItemPromotion({ row }) {
  const { dispatch } = useProductContext();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
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
          Swal.fire(
            "Đã Xóa Thành Công!",
            `Bạn đã xoá sản phẩm có mã: ${item.id} !`,
            "success"
          ).then(dispatch(setProduct(res)));
        });
      }
    });
  };

  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      {/* <FormUpdatePromotion
        item={row}
        open={open}
        handleClose={handleCloseUpdate}
        setSuccess={setSuccess}
        setMessage={setMessage}
        setSeverity={setSeverity}
      /> */}
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell key={"code"} align={"center"} className="border-r-2">
          {row?.code ?? ""}
        </TableCell>
        <TableCell key={"name"} align={"center"} className="border-r-2">
          {row?.name}
        </TableCell>
        <TableCell key={"target"} align={"center"} className="border-r-2">
          {row?.target === "ORDER" ? "Dành Cho Đơn Hàng" : "Dành Cho Sản Phẩm"}
        </TableCell>
        <TableCell key={"discountType"} align={"center"} className="border-r-2">
          {row?.discountType === "PERCENTAGE"
            ? "Theo Phần Trăm"
            : "Theo Giá Tiền"}
        </TableCell>
        <TableCell key={"value"} align={"center"} className="border-r-2">
          {row?.discountType === "PERCENTAGE"
            ? `${row?.value}.000 VND`
            : `${row?.value}%`}
        </TableCell>
        <TableCell key={"fromTime"} align={"center"} className="border-r-2">
          {row?.fromTime}
        </TableCell>
        <TableCell key={"toTime"} align={"center"} className="border-r-2">
          {row?.toTime}
        </TableCell>
        <TableCell key={"toTime"} align={"center"} className="border-r-2">
          {row?.products.length}
        </TableCell>
        <TableCell key={"status"} align={"center"} className="border-r-2">
          {row.enableStatus == "ENABLED" ? (
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-sm"
            >
              Hiện
            </Button>
          ) : (
            <Button variant="outlined">Ẩn</Button>
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
