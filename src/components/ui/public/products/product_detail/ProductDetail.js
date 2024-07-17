"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useProductContext } from "@/contexts/ProductContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { updateCart, useCartContext } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import DiaLog from "@/components/DiaLog";
import AlertNotication from "@/components/AlertNotication";
import { addOrUpdate } from "@/api/CartClient";
import { fetchByName } from "@/api/ProductClient";

export default function ProductDetail({ pathParam }) {
  const router = useRouter();
  const [severity, setSeverity] = useState("success");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [msg, setMsg] = useState("");
  const { productState } = useProductContext();
  const { cartState, dispatchCart } = useCartContext();
  const { state } = useAuthContext();
  const { isLoggedIn } = state;
  const { cartList } = cartState;
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchByName(decodeURIComponent(pathParam)).then((res) => {
      if (res.success) {
        setLoading(false);
        setProduct(res.data);
      } else {
        setError(true);
      }
    });
  }, [pathParam]);

  console.log("product", product);

  const callAddItemApi = async () => {
    const qty = findQty(product.id);
    return addOrUpdate({
      productId: product.id,
      quantity: qty + 1,
    });
  };

  const findQty = (id) => {
    const idx = cartList.findIndex((i) => i?.product?.id === id);
    console.log("idx", idx);
    if (~idx) {
      console.log(cartList[idx]);
      return cartList[idx].quantity;
    }
    return 0;
  };

  const checkLogin = () => {
    if (!isLoggedIn) {
      setOpen(true);
      return false;
    }
    return true;
  };

  const add = async () => {
    const checkLoggedin = checkLogin();
    if (success) {
      setSuccess(false);
      return;
    }
    if (checkLoggedin && product?.id) {
      const res = await callAddItemApi();
      if (res && res.success) {
        setMsg("Thêm Sản Vào Giỏ Hàng Thành Công");
        setSeverity("success");

        dispatchCart(updateCart(res));
        setSuccess(true);
        console.log("cart", cartList);
      } else {
        setMsg("Thêm Sản Phẩm Vào Giỏ Hàng Thất Bại");
        setSeverity("error");
      }
    }
  };

  if (loading) {
    return <Typography>loading....</Typography>;
  }

  if (error) {
    return <Typography>404 NOT FOUND!</Typography>;
  }

  return (
    <>
      <DiaLog
        title={"Bạn Đã Đăng Nhập Chưa?"}
        message={"Vui lòng đăng nhập để trải nghiệm tốt dịch vụ của chúng tôi!"}
        handleAccept={() => router.push("/login")}
        open={open}
        setOpen={setOpen}
      />
      <AlertNotication
        severity={severity}
        setSuccess={setSuccess}
        success={success}
        message={msg}
      />
      <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={2}>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={5}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={20}
                  width={20}
                  style={{
                    height: "20rem",
                    objectFit: "contain",
                    padding: 10,
                  }}
                  src={product?.image ?? "/product.jpg"}
                  alt="hình Cún Con"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent={"space-between"}
              height={"100%"}
              padding={2}
            >
              <Typography variant="h5" gutterBottom>
                {product?.name}
              </Typography>
              <Divider />
              <Box height={10} />
              <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="text.secondary"
                    sx={{ fontWeight: 700 }}
                    marginRight={1}
                  >
                    {product.discount}.000 VND
                  </Typography>
                  {product.discount != product.price && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through", opacity: 0.6 }}
                    >
                      {product?.price ?? 0}.000 VND
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                justifyContent={"space-evenly"}
              >
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    color: "#FC9C55",
                    fontSize: "20px",
                    lineHeight: 1.43,
                    letterSpacing: "0.01071em",
                    borderColor: "#FC9C55",
                    "&:hover": {
                      backgroundColor: "#FC9C55",
                      borderColor: "#FC9C55",
                      color: "white",
                    },
                  }}
                  onClick={add}
                >
                  Thêm Vào Giỏ Hàng
                </Button>

                <Button
                  size="medium"
                  variant="contained"
                  style={{
                    fontWeight: 500,
                    backgroundColor: "#FC9C55",
                    fontSize: "20px",
                    lineHeight: 1.43,
                    letterSpacing: "0.01071em",
                  }}
                >
                  Mua Ngay
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Mô Tả Sản Phẩm" value="1" />
              <Tab label="Thông Tin Sản Phẩm" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{product?.description}</TabPanel>
          <TabPanel value="2">{product?.info ?? ""}</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
