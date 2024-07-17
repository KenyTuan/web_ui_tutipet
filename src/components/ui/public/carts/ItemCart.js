"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { removeItem, setQuantity } from "@/contexts/CartContext";
import { addOrUpdate, remove } from "@/api/CartClient";

export default function ItemCart({
  cartItem,
  checked,
  handleCheckboxChange,
  isLoggedIn,
  setOpen,
  dispatchCart,
  setMessage,
  setTilte,
}) {
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isClicked, setClicked] = useState(false);

  const updateQuantity = useCallback(async () => {
    const res = await addOrUpdate({
      quantity: cartItem.quantity,
      productId: cartItem.product.id,
    });
    if (res && res.success) {
      const item = res.data.productCart.filter(
        (item) => item.id === cartItem.id
      );
      console.log(item);
      dispatchCart(setQuantity(item));
    }
  }, [cartItem.id, cartItem.product.id, dispatchCart, cartItem.quantity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime > 1000) {
        if (isClicked) {
          setClicked(false);
          updateQuantity();
        }
      } else {
        console.log("Người dùng đang spam click!");
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [lastClickTime, isClicked, updateQuantity]);

  const handleIncrement = () => {
    if (!isLoggedIn) {
      setOpen(true);
      setTilte("Bạn Đã Đăng Nhập Chưa?");
      setMessage(
        "Vui lòng đăng nhập để trải nghiệm tốt dịch vụ của chúng tôi!"
      );
      return;
    }
    cartItem.quantity += 1;
    setLastClickTime(new Date().getTime());
    setClicked(true);
  };

  const handleDecrement = () => {
    if (!isLoggedIn) {
      setOpen(true);
      setTilte("Bạn Đã Đăng Nhập Chưa?");
      setMessage(
        "Vui lòng đăng nhập để trải nghiệm tốt dịch vụ của chúng tôi!"
      );
      return;
    }
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      setLastClickTime(new Date().getTime());
      setClicked(true);
    }
  };

  const deleteItem = async () => {
    if (!isLoggedIn) {
      setOpen(true);
      setTilte("Bạn Đã Đăng Nhập Chưa?");
      setMessage(
        "Vui lòng đăng nhập để trải nghiệm tốt dịch vụ của chúng tôi!"
      );
      return;
    }
    const res = await remove(cartItem.product.id);
    if (res && res.success) {
      dispatchCart(removeItem(cartItem.id));
    }
  };

  return (
    <>
      <Box marginBottom={1}>
        <Paper elevation={1}>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingTop={2}
            paddingBottom={2}
          >
            <Box width={"5%"} justifyContent={"center"} display={"flex"}>
              <Checkbox checked={checked} onClick={handleCheckboxChange} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width={"40%"} paddingLeft={2} paddingRight={2}>
              <Card>
                <CardActionArea
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{
                      padding: 10,
                      height: "7rem",
                      width: "7rem",
                      objectFit: "cover",
                    }}
                    image={cartItem?.product?.image ?? "/product.jpg"}
                    alt={"hinh san pham"}
                  />
                  <CardContent sx={{ width: "100%" }}>
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="div"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        fontSize: 13,
                      }}
                    >
                      {cartItem.product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width={"15%"} justifyContent={"center"} display={"flex"}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
                marginRight={1}
              >
                {cartItem.product.discount}
                .000 VND
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              width={"15%"}
              paddingLeft={3}
              paddingRight={3}
              justifyContent={"center"}
              display={"flex"}
            >
              <IconButton onClick={handleDecrement}>
                <Remove />
              </IconButton>
              <Typography variant="body1" sx={{ margin: "8px 8px" }}>
                {cartItem.quantity}
              </Typography>
              <IconButton onClick={handleIncrement}>
                <Add />
              </IconButton>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width={"15%"} justifyContent={"center"} display={"flex"}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
                marginRight={1}
              >
                {cartItem.product.discount * cartItem.quantity}.000 VND
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              width={"10%"}
              paddingLeft={2}
              justifyContent={"center"}
              display={"flex"}
            >
              <Button
                size="medium"
                variant="contained"
                style={{ backgroundColor: "#FC9C55" }}
                onClick={deleteItem}
              >
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  Xóa
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
