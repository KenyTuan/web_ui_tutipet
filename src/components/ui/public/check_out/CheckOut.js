"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
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
import { uncheckAllItems, useCartContext } from "@/contexts/CartContext";
import { usePromotionContext } from "@/contexts/PromotionContext";

export default function CheckOut() {
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [info, setInfo] = useState({ phone: "", address: "" });
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [validateCode, setValidateCode] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const { dispatchOrder } = useOrderContext();
  const [totalPre, setTotalPre] = useState(0);
  const [promotion, setPromotion] = useState(null);
  const router = useRouter();
  const { cartState, dispatchCart } = useCartContext();
  const { cartList } = cartState;
  const { promotionState } = usePromotionContext();
  const { promotionList } = promotionState;

  console.log("cartItems", cartItems);

  useEffect(() => {
    dispatchCart(uncheckAllItems());
  }, [dispatchCart]);

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => {
      const pricePromotion =
        item?.product?.promotions?.discountType == "SPECIFIC"
          ? item?.product?.price - item?.product?.promotions?.value
          : item?.product?.price -
            (item?.product?.price * item?.product?.value) / 100;

      const priceProduct =
        item?.product?.promotions == null
          ? item?.product?.price
          : pricePromotion;
      return total + priceProduct * item?.quantity;
    }, 0);
    setTotalOrder(totalAmount);
    setTotalPre(totalAmount);
  }, [cartItems]);

  useEffect(() => {
    const urlEncodedData = searchParams.checkedItems;

    if (urlEncodedData) {
      try {
        const decodedData = atob(urlEncodedData);

        const jsonObject = JSON.parse(decodedData);

        const cartItemSelected = [...jsonObject.checkedItems];
        const itemsSelected = cartList.filter((i) =>
          cartItemSelected.includes(i.id)
        );
        console.log("cartItemSelected", itemsSelected);

        setCartItems([...itemsSelected]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [cartList, searchParams]);

  const handleOnclickPayment = () => {
    if (!info.phone && !info.address) {
      Swal.fire("Thông báo!", `Vui lòng nhập thông tin đặt hàng!`, "warning");
      return;
    }
    createOrder({
      phone: info.phone,
      address: info.address,
      promotionId: promotion?.id ?? 0,
      productOrders: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    }).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          if (res.success) {
            dispatchOrder(acctionAddOrderUser(res));
            router.replace(`/list_order`);
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

  const handleOnclickPaymentVnpay = () => {
    if (!info.phone && !info.address) {
      Swal.fire("Thông báo!", `Vui lòng nhập thông tin đặt hàng!`, "warning");
      return;
    }
    createOrder({
      phone: info.phone,
      address: info.address,
      promotionId: promotion?.id ?? 0,
      productOrders: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    }).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          if (res.success) {
            dispatchOrder(acctionAddOrderUser(res));
            createPaymentVnPay({
              code: res.data.code,
            }).then((res) => {
              if (res.success) {
                window.location.href = res.data;
              } else {
                Swal.fire("Thông Báo!", `Hệ thống đang xảy ra lỗi!`, "warning");
              }
              return;
            });
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
    validateCodePromotion({ code }).then((res) => {
      if (res.success) {
        const promotionValidated = promotionList.filter(
          (i) => i.code === code
        )[0];
        console.log("promotionValidated", promotionValidated);
        setPromotion(promotionValidated);
        if (promotionValidated.discountType === "PERCENTAGE") {
          setTotalOrder(
            totalOrder - (totalOrder * promotionValidated.value) / 100
          );
        } else {
          setTotalOrder(totalOrder - promotionValidated.value);
        }
        return;
      } else {
        const totalAmount = cartItems.reduce((total, item) => {
          return total + item?.product?.price * item?.quantity;
        }, 0);
        setTotalOrder(totalAmount);
        setValidateCode(true);
        setCode("");
        return;
      }
    });
  };

  const handleRemovePromotion = () => {
    setCode("");
    setTotalOrder(totalPre);
    setPromotion(null);
  };

  return (
    <>
      <Container backgroundColor={"white"}>
        <FormInfoOrder open={open} setOpen={setOpen} setInfo={setInfo} />
        <Paper elevation={1}>
          <Box className="p-6 min-h-[900px]">
            <Grid container>
              <Grid item xs={7} className="h-[800px]">
                <Box className="py-2 px-6 h-[800px]">
                  <Paper elevation={2}>
                    <Box className="p-4 bg-orange-200 h-[800px]">
                      <List
                        sx={{
                          padding: 2,
                          width: "100%",
                          position: "relative",
                          overflow: "auto",
                          maxHeight: 800,
                          "& ul": { padding: 0 },
                        }}
                        subheader={<li />}
                      >
                        {cartItems.map((item) => (
                          <ItemProductOrder key={item?.id} item={item} />
                        ))}
                      </List>
                    </Box>
                  </Paper>
                </Box>
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
                            <Grid item xs={9}>
                              <Stack display={"flex"} paddingLeft={2}>
                                <Stack display={"flex"} flexDirection={"col"}>
                                  <Typography
                                    fontSize={16}
                                    fontStyle={"italic"}
                                  >
                                    {info.address}
                                  </Typography>
                                  <Typography
                                    fontSize={16}
                                    marginBottom={1}
                                    textAlign={"end"}
                                  >
                                    SĐT: {info.phone}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item xs={3}>
                              <Box>
                                <Button
                                  variant="text"
                                  onClick={() => setOpen(true)}
                                >
                                  Thay Đổi
                                </Button>
                              </Box>
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
                        {!promotion ? (
                          <>
                            <Stack
                              display={"flex"}
                              direction={"row"}
                              justifyContent={"right"}
                            >
                              <TextField
                                label="Nhập mã giảm giá"
                                variant="outlined"
                                size="small"
                                sx={{ marginRight: 3 }}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                              />
                              <Button
                                size="small"
                                variant="contained"
                                style={{
                                  backgroundColor: "#FC9C55",
                                }}
                                onClick={handleValidateCode}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: 10, fontWeight: 700 }}
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
                          </>
                        ) : (
                          <Stack
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"right"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={16} fontStyle={"italic"}>
                              Mã đã được áp dụng thành công
                            </Typography>
                            <Button
                              variant="text"
                              onClick={handleRemovePromotion}
                            >
                              thay đổi
                            </Button>
                          </Stack>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={5}></Grid>
                      <Grid item xs={7}>
                        <Stack className="flex justify-between flex-row italic">
                          <Typography fontSize={13}>
                            {" "}
                            Tổng Tiền Hàng:{" "}
                          </Typography>
                          <Typography fontSize={13}>
                            {totalPre}.000 VND
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={5}></Grid>
                      <Grid item xs={7}>
                        <Stack className="flex justify-between flex-row italic">
                          <Typography fontSize={13}>Tổng Tiền Giảm</Typography>
                          <Typography fontSize={13}>
                            {!!promotion
                              ? promotion.discountType == "PERCENTAGE"
                                ? "-" +
                                  (
                                    (totalPre * promotion.value) /
                                    100
                                  ).toLocaleString("en-US", {
                                    style: "decimal",
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3,
                                  }) +
                                  "VND"
                                : "-" + promotion.value + ".000 VND"
                              : 0}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={5}></Grid>
                      <Grid item xs={7}>
                        <Stack
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Typography fontSize={13} fontStyle={"italic"}>
                            Tổng Thành Tiền:
                          </Typography>
                          <Typography fontSize={18} fontWeight={600}>
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
                        justifyContent={"space-between"}
                      >
                        <Button
                          size="large"
                          variant="outlined"
                          style={{ borderColor: "#FC9C55" }}
                          onClick={handleOnclickPayment}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#FC9C55",
                            }}
                          >
                            Thanh Toán Trực Tiếp
                          </Typography>
                        </Button>
                        <Button
                          size="large"
                          variant="outlined"
                          style={{ borderColor: "#FC9C55" }}
                          onClick={handleOnclickPaymentVnpay}
                        >
                          <Avatar
                            sx={{ width: 25, height: 25 }}
                            variant="rounded"
                            alt="Remy Sharp"
                            src={"/vnpay.png"}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#FC9C55",
                            }}
                          >
                            Thanh Toán VnPay
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
