"use client";
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AlertNotication from "@/components/AlertNotication";
import Swal from "sweetalert2";
import FormUpdatePromotion from "./FormUpdatePromotion";
import { deletePromotion, updatePromotionStatus } from "@/api/PromotionClient";
import {
  acctionDeletePromotion,
  acctionUpdatePromotion,
  usePromotionContext,
} from "@/contexts/PromotionContext";

export default function ItemPromotion({ row, index }) {
  const { dispatchPromotion } = usePromotionContext();
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
        deletePromotion(item.id).then((res) => {
          Swal.fire(
            "Thông Báo!",
            `Hệ thống đã xóa thành công.`,
            "success"
          ).then(dispatchPromotion(acctionDeletePromotion(item.id)));
        });
      }
    });
  };

  const handleChangeStatus = (action) => {
    updatePromotionStatus(row.id, action ? "DISABLED" : "ENABLED").then(
      (res) => {
        console.log("res", res);
        if (res.success) {
          Swal.fire(
            "Thông Báo",
            `Hệ thống đã ${action ? "ẩn" : "hiện"} dữ liệu này.`,
            "success"
          ).then(dispatchPromotion(acctionUpdatePromotion(res, index)));
          return;
        }
        Swal.fire("Thông Báo", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
      }
    );
  };

  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <FormUpdatePromotion
        item={row}
        open={open}
        handleClose={handleCloseUpdate}
        setSuccess={setSuccess}
        setMessage={setMessage}
        setSeverity={setSeverity}
        index={index}
      />
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
          {row?.discountType !== "PERCENTAGE"
            ? `${row?.value}.000 VND`
            : `${row?.value}%`}
        </TableCell>
        <TableCell key={"fromTime"} align={"center"} className="border-r-2">
          {row?.fromTime}
        </TableCell>
        <TableCell key={"toTime"} align={"center"} className="border-r-2">
          {row?.toTime}
        </TableCell>
        <TableCell
          key={"lengthProducts"}
          align={"center"}
          className="border-r-2"
        >
          {row?.products.length}
        </TableCell>
        <TableCell key={"status"} align={"center"} className="border-r-2">
          {row.enableStatus == "ENABLED" ? (
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
