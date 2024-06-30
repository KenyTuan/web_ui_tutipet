import React from "react";
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
import { AddCircle, Delete, Edit, Visibility } from "@mui/icons-material";

export default function ItemProduct({ row }) {
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell key={"id"} align={"center"} className="border-r-2">
          {row.id}
        </TableCell>
        <TableCell key={"name"} align={"center"} className="border-r-2">
          <CardActionArea>
            <CardMedia
              src={row.img}
              component="img"
              height={12}
              style={{ height: "8rem", objectFit: "contain" }}
              alt="hình cún con"
            />
          </CardActionArea>
        </TableCell>
        <TableCell key={"name"} align={"center"} className="border-r-2">
          {row.name}
        </TableCell>
        <TableCell key={"type"} align={"center"} className="border-r-2">
          {row.type.name}
        </TableCell>
        <TableCell key={"pet"} align={"center"} className="border-r-2">
          {row.type.petTypes === "CAT" ? "Mèo" : "Chó"}
        </TableCell>
        <TableCell key={"price"} align={"center"} className="border-r-2">
          {row.price.toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}{" "}
          VND
        </TableCell>
        <TableCell key={"price"} align={"center"} className="border-r-2">
          {!!row.promotion
            ? (row.promotion.discountType === "PERCENTAGE"
                ? row.price - row.price * row.promotion.value
                : row.price - row.promotion.value
              ).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })
            : row.price.toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}{" "}
          VND
        </TableCell>
        <TableCell key={"status"} align={"center"} className="border-r-2">
          {row.status == "ENABLED" ? (
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-sm"
              onClick={() => updateEnableByID(row.id, true)}
            >
              Hiện
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => updateEnableByID(row.id, false)}
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
              onClick={() => handleEditProduct(row)}
            />
            <Delete
              style={{
                fontSize: "20px",
                color: "darkred",
                cursor: "pointer",
              }}
              onClick={() => {
                deleteProductByID(row.id);
              }}
            />
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
