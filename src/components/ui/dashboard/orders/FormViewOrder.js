import { Box, Button, Grid, List, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Slabo_13px } from "next/font/google";
import React from "react";
import ItemProductOrder from "../../public/validate-order/ItemProductOrder";
import { changeStautsOrder, fetchOrderByid } from "@/api/OrderClient";
import Swal from "sweetalert2";
import { acctionUpdateOrder, useOrderContext } from "@/contexts/OrderContext";

export default function FormViewOrder({ open, handleClose, item, index }) {
  const { dispatchOrder } = useOrderContext();

  const handleChangeStaus = (action) => {
    changeStautsOrder(item.id, action).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          handleClose();
          if (res.success) {
            Swal.fire(
              "Thông Báo",
              `Hệ thống đã cập nhật dữ liệu này.`,
              "success"
            ).then(dispatchOrder(acctionUpdateOrder(res, index)));
            return;
          } else {
            Swal.fire("Thông Báo", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
            return;
          }
        });
      }
      handleClose();
      Swal.fire("Thông Báo", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
    });
  };
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} marginBottom={1}>
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Typography>
                {item?.paymentType === "PAYMENT_VNP"
                  ? "Bằng VnPay"
                  : "Trức Tiếp"}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component={"div"}
                sx={{ fontWeight: 700, textAlign: "center" }}
              >
                Thông Tin Đơn Hàng
              </Typography>
              {item.status != "DONE" && (
                <Button
                  variant="contained"
                  className="bg-red-500 hover:bg-red-600 text-xs font-bold "
                  onClick={() => handleChangeStaus("PAID")}
                >
                  Hủy Đơn
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              variant="body1"
              component={"div"}
              sx={{ padding: "20px", fontWeight: 600, textAlign: "left" }}
            >
              Mã Đơn: {item?.code}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              gutterBottom
              variant="body1"
              component={"div"}
              sx={{ padding: "20px", textAlign: "end", fontStyle: "italic" }}
            >
              Thời Gian: {dayjs(item?.orderDate).format("DD/MM/YYYY HH:ss")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack display={"flex"} flexDirection={"col"} paddingLeft={5}>
              <Typography
                fontSize={18}
                fontWeight={"bold"}
                className="capitalize"
              >
                {item.user?.fullName}
              </Typography>
              <Typography fontSize={18}>{item.phone}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Typography fontSize={16} fontStyle={"italic"}>
              Địa Chỉ: {item.address}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
              Sản Phẩm Đã Đặt
            </Typography>
            <List
              sx={{
                width: "95%",
                position: "relative",
                overflow: "auto",
                maxHeight: 500,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {item?.productOrder?.map((item) => (
                <ItemProductOrder key={item.id} item={item} />
              ))}
            </List>
          </Grid>
          <Grid item xs={4}>
            <Stack display={"flex"} justifyContent={"right"}>
              <Typography className="text-lg font-bold">
                Tổng Thành Tiền:
              </Typography>
              <Typography className="text-xl font-bold text-end">
                {item.total}.000 VND
              </Typography>
            </Stack>
            <Stack
              display={"flex"}
              justifyContent={"center"}
              direction={"row"}
              height={50}
            >
              {item.status == "OPEN" && (
                <Button
                  variant="contained"
                  className="bg-green-500 hover:bg-green-600 text-xs font-bold"
                  onClick={() => handleChangeStaus("SUBMITTED")}
                >
                  Duyệt Đơn
                </Button>
              )}
              {item.status == "SUBMITTED" && (
                <Button
                  variant="contained"
                  className="bg-yellow-500 hover:bg-yellow-600 text-xs font-bold"
                  onClick={() => handleChangeStaus("ON_DELIVERY")}
                >
                  Vận Chuyển
                </Button>
              )}
              {item.status == "ON_DELIVERY" && (
                <Button
                  variant="contained"
                  className="bg-emerald-500 hover:bg-emerald-600 text-xs font-bold"
                  onClick={() => handleChangeStaus("DONE")}
                >
                  Đã Xong
                </Button>
              )}
              {item.status == "DONE" && (
                <Button
                  variant="contained"
                  className="bg-emerald-500 hover:bg-emerald-600 text-xs font-bold"
                >
                  Hoàn Tất
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
