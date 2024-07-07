"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { fetchOrderByid, validateOrder } from "@/api/OrderClient";
import {
  acctionUpdateOrderUser,
  useOrderContext,
} from "@/contexts/OrderContext";

export default function ValidPayment() {
  const route = useRouter();
  const currentUrl = window.location.href;
  const [message, setMessage] = React.useState("");

  function getQueryParamValue(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const urlParams = new URLSearchParams(currentUrl);

  var vnp_Amount = getQueryParamValue("vnp_Amount", currentUrl);
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
  const vnp_CardType = urlParams.get("vnp_CardType");
  const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
  const vnp_TmnCode = urlParams.get("vnp_TmnCode");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  const vnp_SecureHash = urlParams.get("vnp_SecureHash");
  const date = dayjs(vnp_PayDate, "YYYYMMDDHHmmss");
  const { dispatchOrder } = useOrderContext();

  const handleClickPayment = async () => {
    validateOrder({ code: vnp_TxnRef }).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          if (res.success) {
            dispatchOrder(acctionUpdateOrderUser(res));
            route.replace("/products");
            return;
          } else {
            Swal.fire("Thông Báo!", `Hệ thống đang xảy ra lỗi!`, "warning");
            return;
          }
        });
      } else {
        Swal.fire("Thông Báo!", `Hệ thống đang xảy ra lỗi!`, "warning");
        return;
      }
    });
  };

  const handleClickClose = async () => {
    route.replace("/shopping_cart");
  };

  return (
    <Container>
      <Box padding={5}>
        <Paper className="bg-slate-50 ">
          <Grid container spacing={1} padding={3}>
            <Grid item xs={12}>
              <Box>
                <Typography
                  textAlign={"center"}
                  fontSize={36}
                  fontWeight={"600"}
                  className="text-orange-600"
                >
                  {vnp_ResponseCode && vnp_ResponseCode === "24"
                    ? "Hủy Thanh Toán"
                    : vnp_ResponseCode === "15"
                    ? "Thanh Toán Thất Bại"
                    : "Thanh Toán Thành Công"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Box height={10} />
            </Grid>
            <Grid item xs={12}>
              <Box paddingRight={15} paddingLeft={15} marginBottom={3}>
                <Paper elevation={3}>
                  <Box paddingLeft={"15%"} paddingTop={5} paddingBottom={5}>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Mã Giao Dịch:
                      </Typography>
                      <Typography
                        marginLeft={3}
                        variant="h6"
                        fontStyle={"italic"}
                      >
                        {date.format()}
                      </Typography>
                    </Stack>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Mã Giao Dịch:
                      </Typography>
                      <Typography marginLeft={3} variant="h6">
                        01
                      </Typography>
                    </Stack>

                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Ngân Hàng Giao Dịch:
                      </Typography>
                      <Typography marginLeft={3} variant="h6">
                        {vnp_BankCode}
                      </Typography>
                    </Stack>

                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Loại Thẻ:
                      </Typography>
                      <Typography marginLeft={3} variant="h6">
                        {vnp_CardType}
                      </Typography>
                    </Stack>

                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Thành Tiền:
                      </Typography>
                      <Typography marginLeft={3} variant="h6">
                        {vnp_Amount &&
                          (parseFloat(vnp_Amount) / 100).toLocaleString(
                            "en-US",
                            {
                              style: "decimal",
                            }
                          )}{" "}
                        VND
                      </Typography>
                    </Stack>

                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      padding={1}
                    >
                      <Typography variant="h6" fontWeight={"600"}>
                        Nội Dung Thanh Toán:
                      </Typography>
                      <Typography marginLeft={3} variant="h6">
                        Thanh Toán Đơn Hàng {vnp_TxnRef}
                      </Typography>
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} justifyContent={"center"} display={"flex"}>
              {vnp_ResponseCode === "00" ? (
                <Button
                  size="large"
                  variant="contained"
                  style={{ backgroundColor: "#FC9C55" }}
                  onClick={handleClickPayment}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Xác Nhận
                  </Typography>
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  style={{ backgroundColor: "#FC9C55" }}
                  onClick={handleClickClose}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Quay Lại
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
