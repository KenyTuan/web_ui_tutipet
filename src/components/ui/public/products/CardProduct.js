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
import { addOrUpdate } from "@/api/CartClient";
import {
  toggleCheckItem,
  updateCart,
  useCartContext,
} from "@/contexts/CartContext";
import { useAuthContext } from "@/contexts/AuthContext";
import DiaLog from "@/components/DiaLog";
import AlertNotication from "@/components/AlertNotication";

export default function CardProduct({ product }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const { cartState, dispatchCart } = useCartContext();
  const { state } = useAuthContext();
  const { isLoggedIn } = state;
  const { cartList } = cartState;
  const [msg, setMsg] = useState("");

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

  const buy = async () => {
    const isLoggedIn = checkLogin();
    if (isLoggedIn && product?.id) {
      const res = await callAddItemApi();
      if (res && res.success) {
        dispatchCart(updateCart(res));

        const checkedItems = cartList.filter(
          (item) => item.product.id == product.id
        );
        if (checkedItems.length === 0) {
          const params = new URLSearchParams();
          const checkedItemsData = {
            checkedItems: [res.data],
          };
          const jsonString = JSON.stringify(checkedItemsData);

          const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
          params.append("checkedItems", encodedData);
          router.push(`/check_out?${params.toString()}`);
        }

        console.log("checkedItems", checkedItems);
        console.log("cartList", cartList);

        if (checkedItems.length > 0) {
          const params = new URLSearchParams();
          const checkedItemsData = {
            checkedItems: checkedItems,
          };
          const jsonString = JSON.stringify(checkedItemsData);

          const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
          params.append("checkedItems", encodedData);
          router.push(`/check_out?${params.toString()}`);
        }
      } else {
        setMsg("Thêm Sản Phẩm Vào Giỏ Hàng Thất Bại");
        setSeverity("error");
      }
    }
  };

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
          className="h-[250px]"
          onClick={() => {
            router.push(`/products/${encodeURIComponent(product.name)}`);
          }}
        >
          <CardMedia
            src={product?.image ?? "/product.jpg"}
            component="img"
            sx={{
              paddingX: 8,
              objectFit: "cover",
              height: "150px",
            }}
            alt="hình cún con"
          />

          <CardContent>
            <Box className="line-clamp-1 min-h-3">
              <p className="font-normal text-base italic">
                {product?.name ?? "Ten san pham"}
              </p>
            </Box>

            <Box className="flex flex-row justify-end items-center">
              <Typography
                variant="body1"
                color="text.secondary"
                className="font-bold mr-1"
              >
                {product.discount}.000 VND
              </Typography>
              {product.discount != product.price && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="line-through font-bold"
                >
                  {product?.price ?? 0}.000 VND
                </Typography>
              )}
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
            onClick={buy}
          >
            Mua Ngay
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
