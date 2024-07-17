"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Board from "@/components/ui/dashboard/Board";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import AlertNotication from "@/components/AlertNotication";
import { useOrderContext } from "@/contexts/OrderContext";
import ItemOrder from "./ItemOrder";

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
  { id: "code", label: "Mã Giảm", minWidth: 150, align: "center" },
  { id: "name", label: "Người Đặt", minWidth: 150, align: "center" },
  { id: "paymentType", label: "Thanh Toán", minWidth: 170, align: "center" },
  { id: "phone", label: "Liên Hệ", minWidth: 170, align: "center" },
  { id: "address", label: "Địa Chỉ", minWidth: 300, align: "center" },
  { id: "status", label: "Trạng Thái", minWidth: 150, align: "center" },
  { id: "orderDate", label: "Thời Gian", minWidth: 300, align: "center" },
  { id: "total", label: "Thành Tiền", minWidth: 250, align: "center" },
  {
    id: "lengthProducts",
    label: "Tổng Sản Phẩm",
    minWidth: 150,
    align: "center",
  },
  { id: "action", label: "Xóa", minWidth: 60, align: "center" },
];

export default function OrderList() {
  const [page, setPage] = useState(0);
  const { orderState, dispatchOrder } = useOrderContext();
  const { orderListAdmin } = orderState;
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
  console.log("orderListAdmin", orderListAdmin);
  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <Paper sx={{ width: "100%" }}>
        <Typography
          gutterBottom
          variant="h4"
          component={"div"}
          sx={{ padding: "20px" }}
          className="font-bold"
        >
          Quản Lý Đơn Hàng
        </Typography>
        <Divider />
        <Box height={25} />
        <Board columns={columns}>
          {orderListAdmin
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <ItemOrder row={row} key={row.id} index={index} />
            ))}
        </Board>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={orderListAdmin.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
