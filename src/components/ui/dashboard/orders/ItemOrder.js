"use client";
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Modal, Stack } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import AlertNotication from "@/components/AlertNotication";
import Swal from "sweetalert2";
import { deletePromotion, updatePromotionStatus } from "@/api/PromotionClient";
import {
  acctionDeletePromotion,
  acctionUpdatePromotion,
} from "@/contexts/PromotionContext";
import { acctionDeleteOrder, useOrderContext } from "@/contexts/OrderContext";
import dayjs from "dayjs";
import FormViewOrder from "./FormViewOrder";
import { deletedOrder } from "@/api/OrderClient";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "60%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export default function ItemOrder({ row, index }) {
  const { dispatchOrder } = useOrderContext();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleCloseView = () => setOpen(false);
  const handleOpenView = () => setOpen(true);

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
        deletedOrder(item.id).then((res) => {
          Swal.fire(
            "Thông Báo!",
            `Hệ thống đã xóa thành công.`,
            "success"
          ).then(dispatchOrder(acctionDeleteOrder(item.id)));
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
      <Modal
        open={open}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormViewOrder
            handleClose={handleCloseView}
            open={open}
            item={row}
            index={index}
          />
        </Box>
      </Modal>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        onClick={handleOpenView}
      >
        <TableCell key={"code"} align={"center"} className="border-r-2">
          {row?.code ?? ""}
        </TableCell>
        <TableCell key={"name"} align={"center"} className="border-r-2">
          {row?.user?.fullName}
        </TableCell>
        <TableCell key={"paymentType"} align={"center"} className="border-r-2">
          {row?.paymentType === "PAYMENT_VNP" ? "Bằng VnPay" : "Trức Tiếp"}
        </TableCell>
        <TableCell key={"phone"} align={"center"} className="border-r-2">
          {row?.phone}
        </TableCell>
        <TableCell key={"address"} align={"center"} className="border-r-2">
          {row?.address}
        </TableCell>
        <TableCell key={"status"} align={"center"} className="border-r-2">
          {row.status == "OPEN" && (
            <Button
              variant="contained"
              className="bg-gray-500 hover:bg-gray-600 text-xs font-bold"
            >
              Chờ Duyệt
            </Button>
          )}
          {row.status == "SUBMITTED" && (
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-xs font-bold"
            >
              Đã Duyệt
            </Button>
          )}
          {row.status == "PAID" && (
            <Button
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-xs font-bold"
            >
              Hủy
            </Button>
          )}
          {row.status == "ON_DELIVERY" && (
            <Button
              variant="contained"
              className="bg-yellow-500 hover:bg-yellow-600 text-xs font-bold"
            >
              Đang Vận Chuyển
            </Button>
          )}
          {row.status == "DONE" && (
            <Button
              variant="contained"
              className="bg-emerald-500 hover:bg-emerald-600 text-xs font-bold"
            >
              Hoàn Tất
            </Button>
          )}
        </TableCell>
        <TableCell key={"orderDate"} align={"center"} className="border-r-2">
          {dayjs(row?.orderDate).format("DD/MM/YYYY HH:ss")}
        </TableCell>
        <TableCell key={"total"} align={"center"} className="border-r-2">
          {row?.total}.000 VND
        </TableCell>
        <TableCell
          key={"lengthProducts"}
          align={"center"}
          className="border-r-2"
        >
          {row?.productOrder?.length}
        </TableCell>

        <TableCell key={"action"} align="left" className="border-r-2">
          <Stack spacing={2} direction="row">
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
