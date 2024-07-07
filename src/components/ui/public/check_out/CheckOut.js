"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import ItemProductOrder from "./ItemProductOrder";
import useSearchParams from "@/hook/useSearchParams";
import FormInfoOrder from "./FormInfoOrder";
import Swal from "sweetalert2";
import { createPaymentVnPay } from "@/api/PaymentClient";
import { validateCodePromotion } from "@/api/PromotionClient";
import { createOrder, fetchOrderByid } from "@/api/OrderClient";
import { acctionAddOrderUser, useOrderContext } from "@/contexts/OrderContext";
import { useRouter } from "next/navigation";

export default function CheckOut() {
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [info, setInfo] = useState({ phone: "", address: "" });
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [validateCode, setValidateCode] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const { dispatchOrder } = useOrderContext();
  const router = useRouter();

  console.log("cartItems", cartItems);

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    setTotalOrder(totalAmount);
  }, [cartItems]);

  useEffect(() => {
    const urlEncodedData = searchParams.checkedItems;

    if (urlEncodedData) {
      try {
        const decodedData = atob(urlEncodedData);

        const jsonObject = JSON.parse(decodedData);
        setCartItems(jsonObject.checkedItems);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [searchParams]);
  console.log("info", info);

  const handleOnclickPayment = () => {
    if (!info.phone && !info.address) {
      Swal.fire("Thông báo!", `Vui lòng nhập thông tin đặt hàng!`, "warning");
      return;
    }
    createOrder({
      phone: info.phone,
      address: info.address,
      code: code,
      productOrders: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    }).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          if (res.success) {
            const params = new URLSearchParams();
            params.append("id", res.data.id);
            dispatchOrder(acctionAddOrderUser(res));
            router.push(`/validate_order?${params.toString()}`);
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

  const handleValidateCode = () => {
    if (!code) {
      return;
    }
    validateCodePromotion(code).then((res) => {
      if (res.success) {
        if (res.data.discountType === "") {
          setTotalOrder(totalOrder - (totalOrder * res.data.value) / 100);
        } else {
          setTotalOrder(totalOrder - res.data.value);
        }
        setCode("");
        return;
      } else {
        const totalAmount = cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
        setTotalOrder(totalAmount);
        setValidateCode(true);
        setCode("");
        return;
      }
    });
  };

  return (
    <>
      <Container>
        <FormInfoOrder open={open} setOpen={setOpen} setInfo={setInfo} />
        <Box>
          <Grid container>
            <Grid item xs={7}>
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
                {cartItems.map((item) => (
                  <ItemProductOrder key={item.id} item={item} />
                ))}
              </List>
            </Grid>
            <Grid item xs={5}>
              <Paper elevation={3}>
                <Box padding={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography
                        textAlign={"center"}
                        fontSize={24}
                        fontWeight={700}
                        padding={2}
                        color={"#FC9C55"}
                      >
                        Thông Tin Đơn Hàng
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      {info.phone !== "" && info.address !== "" ? (
                        <Grid container>
                          <Grid item xs={12}>
                            <Stack display={"flex"} flexDirection={"col"}>
                              <Box>
                                <Typography fontSize={18} fontWeight={600}>
                                  Thông Tin Nhận Hàng
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack display={"flex"} paddingLeft={2}>
                              <Stack display={"flex"} flexDirection={"col"}>
                                <Typography fontSize={16} fontStyle={"italic"}>
                                  {info.address}
                                </Typography>
                                <Typography
                                  fontSize={16}
                                  fontStyle={"italic"}
                                  marginBottom={1}
                                  textAlign={"end"}
                                >
                                  SĐT: {info.phone}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
                      ) : (
                        <Stack
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          width={"100%"}
                          marginBottom={3}
                        >
                          <Button
                            size="large"
                            variant="contained"
                            style={{ backgroundColor: "#FC9C55" }}
                            onClick={() => setOpen(true)}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontSize: 14, fontWeight: 700 }}
                            >
                              Nhập Thông Tin Nhận Hàng
                            </Typography>
                          </Button>
                        </Stack>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        display={"flex"}
                        direction={"row"}
                        justifyContent={"right"}
                      >
                        <TextField
                          label="Nhập mã giảm giá"
                          variant="outlined"
                          size="small"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        <Button
                          size="small"
                          variant="contained"
                          style={{ backgroundColor: "#FC9C55", marginLeft: 10 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontSize: 10, fontWeight: 700 }}
                            onClick={handleValidateCode}
                          >
                            Áp dụng
                          </Typography>
                        </Button>
                      </Stack>
                      {validateCode && (
                        <Typography
                          color="error"
                          variant="body2"
                          sx={{ mb: 2 }}
                        >
                          Mã này bạn đã sử dụng. Vui lòng thử lại sau!
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography className="text-xl font-bold">
                          Tổng Thành Tiền:
                        </Typography>
                        <Typography className="text-xl font-bold">
                          {totalOrder.toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })}{" "}
                          VND
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"Center"}
                    >
                      <Button
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#FC9C55" }}
                        onClick={handleOnclickPayment}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: 14, fontWeight: 700 }}
                        >
                          Đặt Hàng
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
