"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOrderContext } from "@/contexts/OrderContext";
import { fetchOrderByid } from "@/api/OrderClient";
import useSearchParams from "@/hook/useSearchParams";
import ItemProductOrder from "./ItemProductOrder";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { createPaymentVnPay } from "@/api/PaymentClient";
import { useRouter } from "next/navigation";

export default function ValidateOrder({ id }) {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const { dispatchOrder } = useOrderContext();
  const [order, setOrder] = useState({});
  const [productOrder, setProductOrder] = useState([]);

  useEffect(() => {
    fetchOrderByid(searchParams.id).then((res) => {
      if (res.success) {
        setOrder(res.data);
        setProductOrder(res.data.productOrder);
        return;
      }
    });
  }, [searchParams.id]);
  console.log("order", order);
  console.log("productOrder", productOrder);

  const handleOnclickPayment = () => {
    createPaymentVnPay({
      code: order.code,
    }).then((res) => {
      if (res.success) {
        window.location.href = res.data;
      } else {
        Swal.fire("Thông Báo!", `Hệ thống đang xảy ra lỗi!`, "warning");
        return;
      }
    });
  };

  return (
    <>
      <Container>
        <Box paddingX={20}>
          <Grid container>
            <Paper elevation={2}>
              <Box padding={5}>
                <Grid container spacing={1}>
                  <Grid item xs={12} marginBottom={2}>
                    <Typography
                      textAlign={"center"}
                      fontSize={24}
                      fontWeight={700}
                      padding={2}
                      color={"#FC9C55"}
                    >
                      Đơn Hàng Đã Đặt Thành Công
                    </Typography>
                    <Typography
                      fontSize={16}
                      fontStyle={"italic"}
                      marginBottom={1}
                      textAlign={"end"}
                    >
                      Ngày đặt:{" "}
                      {dayjs(order.orderDate).format(`DD/MM/YYYY HH[h]mm`)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} marginBottom={2}>
                    <Stack display={"flex"} flexDirection={"col"}>
                      <Typography fontSize={18} fontWeight={"bold"}>
                        {order.user?.fullName}
                      </Typography>
                      <Typography fontSize={18} fontStyle={"italic"}>
                        {order.phone}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={8} marginBottom={2}>
                    <Stack display={"flex"} flexDirection={"col"}>
                      <Typography fontSize={16} fontStyle={"italic"}>
                        Địa Chỉ: {order.address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8} marginBottom={2}>
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
                      {productOrder.map((item) => (
                        <ItemProductOrder key={item.id} item={item} />
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={12} marginBottom={2}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} marginBottom={2}>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"right"}
                    >
                      <Typography className="text-xl font-bold">
                        Tổng Thành Tiền:
                      </Typography>
                      <Typography className="text-xl font-bold">
                        {order.total}.000 VND
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#FC9C55",
                        marginLeft: 50,
                        marginRight: 50,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 14, fontWeight: 700 }}
                        onClick={() => (window.location.pathname = "/")}
                      >
                        Quay Về
                      </Typography>
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#FC9C55",
                        marginLeft: 50,
                        marginRight: 50,
                      }}
                      onClick={handleOnclickPayment}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 14, fontWeight: 700 }}
                      >
                        Thanh Toán
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
