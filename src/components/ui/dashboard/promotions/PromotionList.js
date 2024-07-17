"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Board from "@/components/ui/dashboard/Board";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import AlertNotication from "@/components/AlertNotication";
import ItemPromotion from "./ItemPromotion";
import FormAddPromotion from "./FormAddPromotion";
import { usePromotionContext } from "@/contexts/PromotionContext";

const columns = [
  { id: "code", label: "Mã Giảm", minWidth: 150, align: "center" },
  { id: "name", label: "Tiêu Đề", minWidth: 350, align: "center" },
  { id: "target", label: "Dành Cho", minWidth: 170, align: "center" },
  { id: "value", label: "Giá Trị", minWidth: 250, align: "center" },
  { id: "fromTime", label: "Ngày Bắt Đầu", minWidth: 300, align: "center" },
  { id: "toTime", label: "Ngày Kết Thúc", minWidth: 300, align: "center" },
  {
    id: "lengthProducts",
    label: "Tổng Số Sản Phẩm",
    minWidth: 180,
    align: "center",
  },
  { id: "action", label: "Sửa/Xóa", minWidth: 50, align: "center" },
];

export default function PromotionList() {
  const [page, setPage] = useState(0);
  const { promotionState, dispatchPromotion } = usePromotionContext();
  const { promotionListAdmin } = promotionState;
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
  console.log("promotionListAdmin", promotionListAdmin);
  return (
    <>
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <FormAddPromotion
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
          Danh Sách Chường Trình Khuyến Mãi
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="mx-4">
          <Button
            variant="contained"
            endIcon={<AddCircle />}
            className="bg-blue-500"
            onClick={handleOpenAdd}
          >
            Tạo Chương Trình
          </Button>
        </Stack>
        <Box height={25} />
        <Board columns={columns}>
          {promotionListAdmin
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <ItemPromotion row={row} key={row.id} index={index} />
            ))}
        </Board>
        <Box className="flex justify-start">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={promotionListAdmin.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </>
  );
}
