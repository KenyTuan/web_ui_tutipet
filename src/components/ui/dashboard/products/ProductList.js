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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          Danh Sách Sản Phẩm
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="mx-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            sx={{ width: "40%" }}
            onChange={(e, v) => filterData(v)}
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
            // onClick={handleOpenAdd}
          >
            Thêm Sản Phẩm
          </Button>
        </Stack>
        <Box height={25} />
        <Board columns={columns}>
          {data.length != 0 &&
            data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => <ItemProduct row={row} key={index} />)}
        </Board>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
