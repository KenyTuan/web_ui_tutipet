"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CartClient from "@/api/CartClient";
import { updateCart, useCartContext } from "@/contexts/CartContext";
import Auth from "@/api/Auth";
import { useAuthContext } from "@/contexts/AuthContext";
import DiaLog from "@/components/DiaLog";
import AlertNotication from "@/components/AlertNotication";

export default function CardProduct({ product }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const auth = new Auth();
  const cartClient = new CartClient(auth);
  const { cartState, dispatchCart } = useCartContext();
  const { state } = useAuthContext();
  const { isLoggedIn } = state;
  const { cartList } = cartState;
  const [msg, setMsg] = useState("");

  const callAddItemApi = async () => {
    const qty = findQty(product.id);
    return cartClient.addOrUpdate({
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
        dispatchCart(updateCart(res));
        setSuccess(true);
        setSeverity("success");
        console.log("cart", cartList);
      } else {
        setMsg("Thêm Sản Phẩm Vào Giỏ Hàng Thất Bại");
        setSeverity("error");
      }
    }
  };

  // const buy = async () => {
  //   const isLoggedIn = checkLogin();
  //   if (isLoggedIn && product?.id) {
  //     const res = await callAddItemApi();
  //     if (res && res.success) {
  //       navigate("/cart");
  //     } else {
  //       setMsg(res && typeof res === "string" ? res : res.error.message);
  //     }
  //   }
  // };

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
      <Card className="drop-shadow-xl">
        <CardActionArea
          className="h-[300px]"
          onClick={() => {
            router.push(`/products/${encodeURIComponent(product.name)}`);
          }}
        >
          <CardMedia
            src={product?.image ?? "/product.jpg"}
            component="img"
            sx={{
              paddingY: 2,
              paddingX: 8,
              objectFit: "cover",
              height: "200px",
            }}
            alt="hình cún con"
          />

          <CardContent>
            <Box className="line-clamp-1 min-h-3">
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ lineHeight: "1.5em" }}
              >
                {product?.name ?? "Ten san pham"}
              </Typography>
            </Box>

            <Box className="flex flex-row justify-end items-center">
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                {(product?.price ?? 0).toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}{" "}
                VND
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            size="medium"
            variant="outlined"
            sx={{
              borderColor: "#FC9C55",
              lineHeight: 1.43,
              letterSpacing: "0.01071em",
              color: "#FC9C55",
              fontSize: "12px",
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
              backgroundColor: "#FC9C55",
              lineHeight: 1.43,
              letterSpacing: "0.01071em",
              fontSize: "12px",
            }}
          >
            Mua Ngay
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
