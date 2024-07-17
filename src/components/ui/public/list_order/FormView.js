import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ItemProductOrder from "../../public/validate-order/ItemProductOrder";
import { changeStautsOrder, fetchOrderByid } from "@/api/OrderClient";
import Swal from "sweetalert2";
import { acctionUpdateOrder, useOrderContext } from "@/contexts/OrderContext";

export default function FormView({ open, handleClose, item, index }) {
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} marginBottom={1}>
            <Stack
              className="drop-shadow-lg"
              display={"flex"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Typography className="text-green-600 capitalize font-semibold">
                {item?.paymentType === "PAYMENT_VNP"
                  ? "Thanh Toán VnPay"
                  : "Thanh Toán Trức Tiếp"}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component={"div"}
                className="text-orange-500 font-bold text-center text-3xl"
              >
                Thông Tin Đơn Hàng
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
              sx={{
                padding: "20px",
                textAlign: "end",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Thời Gian:{" "}
              {dayjs(item?.orderDate).format("DD/MM/YYYY lúc HH:mm:ss")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
            <Typography
              sx={{ fontWeight: 700, textAlign: "center" }}
              className="mb-4"
            >
              Sản Phẩm Đã Đặt
            </Typography>
            <List
              className="bg-orange-300 p-2"
              sx={{
                width: "100%",
                position: "relative",
                overflow: "auto",
                height: 400,
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack className="flex justify-between flex-row italic">
                  <Typography fontSize={13}>Mã Sử Dụng:</Typography>
                  <Typography fontSize={13}>
                    {!!item.promotions ? item.promotions.code : ""}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack className="flex justify-between flex-row italic">
                  <Typography fontSize={13}> Tổng Tiền Hàng: </Typography>
                  <Typography fontSize={13}>{item.totalPro}.000 VND</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack className="flex justify-between flex-row italic">
                  <Typography fontSize={13}>Tổng Tiền Giảm</Typography>
                  <Typography fontSize={13}>
                    {!!item.promotions
                      ? item.promotions.discountType == "PERCENTAGE"
                        ? "-" +
                          Math.round(
                            (item.total * item.promotions.value) / 100
                          ).toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          }) +
                          "VND"
                        : "-" + item.promotions.value + ".000 VND"
                      : 0}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack display={"flex"} justifyContent={"right"}>
                  <Typography className="text-lg font-bold">
                    Tổng Thành Tiền:
                  </Typography>
                  <Typography className="text-xl font-bold text-end">
                    {item.total}.000 VND
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
