import { Box, Button, Grid, List, Stack, Typography } from "@mui/material";
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
