"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Divider,
  Paper,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import ItemCart from "./ItemCart";
import { useRouter } from "next/navigation";
import {
  checkAllItems,
  toggleCheckItem,
  uncheckAllItems,
  useCartContext,
} from "@/contexts/CartContext";
import { useAuthContext } from "@/contexts/AuthContext";
import DiaLog from "@/components/DiaLog";
import AlertNotication from "@/components/AlertNotication";

export default function ShoppingCart() {
  const router = useRouter();
  const [checkedAll, setCheckedAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState(false);
  const [title, setTilte] = useState("");
  const { cartState, dispatchCart } = useCartContext();
  const { cartList, loading, error } = cartState;
  const { state } = useAuthContext();
  const { isLoggedIn } = state;

  const totalAmount = useMemo(() => {
    return cartList
      .filter((item) => item.checked == true)
      .reduce((total, item) => {
        return total + item.product.discount * item.quantity;
      }, 0);
  }, [cartList]);

  useEffect(() => {
    const allChecked = cartList.filter((item) => item.checked == true);
    if (allChecked.length === cartList.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [cartList, dispatchCart]);

  const handleCheckedAll = () => {
    const allItemsChecked = cartList.every((item) => item.checked);

    if (allItemsChecked) {
      dispatchCart(uncheckAllItems());
    } else {
      dispatchCart(checkAllItems());
    }

    setCheckedAll(!allItemsChecked);
  };

  const handleCheckboxChange = (index) => {
    dispatchCart(toggleCheckItem(index));
  };

  const handleCheckOut = () => {
    const checkedItems = cartList
      .filter((item) => item.checked)
      .map((item) => item.id);
    if (checkedItems.length > 0) {
      const params = new URLSearchParams();
      const checkedItemsData = {
        checkedItems: checkedItems,
      };
      const jsonString = JSON.stringify(checkedItemsData);

      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      params.append("checkedItems", encodedData);
      router.push(`/check_out?${params.toString()}`);
    } else {
      setWarning(true);
      setMessage("Vui lòng chọn sản phẩm cần mua!");
    }
  };

  return (
    <>
      {cartList.length === 0 ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#ca9d7c" }}
            gutterBottom
          >
            Hiện tại giỏ hàng của bạn chưa có sản phẩm
          </Typography>
          <Button
            size="medium"
            variant="contained"
            style={{
              fontWeight: 600,
              backgroundColor: "#FC9C55",
              marginTop: 15,
            }}
            onClick={() => router.push("/products")}
          >
            <Typography variant="h6" sx={{ color: "#FFF" }}>
              Quay Lại Mua Hàng
            </Typography>
          </Button>
        </Box>
      ) : (
        <>
          <DiaLog
            title={message}
            message={title}
            handleAccept={() => router.push("/login")}
            open={open}
            setOpen={setOpen}
          />
          <AlertNotication
            severity={"warning"}
            setSuccess={setWarning}
            success={warning}
            message={message}
          />
          <Stack
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
            width={"100%"}
          >
            <Box marginBottom={2}>
              <Paper elevation={2}>
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingTop={2}
                  paddingBottom={2}
                >
                  <Box width={"5%"} justifyContent={"center"} display={"flex"}>
                    <Checkbox checked={checkedAll} onClick={handleCheckedAll} />
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    width={"40%"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontWeight={"bold"}
                  >
                    Sản Phẩm
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    width={"15%"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontWeight={"bold"}
                  >
                    Đơn Giá
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    width={"15%"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontWeight={"bold"}
                  >
                    Số Lượng
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    width={"15%"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontWeight={"bold"}
                  >
                    Thành Tiền
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    width={"10%"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontWeight={"bold"}
                  >
                    Thao Tác
                  </Box>
                </Stack>
              </Paper>
            </Box>
            {cartList.map((item, index) => (
              <ItemCart
                key={item.id}
                cartItem={item}
                handleCheckboxChange={() => handleCheckboxChange(index)}
                checked={item.checked}
                isLoggedIn={isLoggedIn}
                setOpen={setOpen}
                dispatchCart={dispatchCart}
                setMessage={setMessage}
                setTilte={setTilte}
              />
            ))}
          </Stack>
          <Box marginBottom={15}>
            <Paper elevation={2}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12} paddingRight={3}>
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    justifyContent={"end"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Typography
                      variant="body2"
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      Tổng Thanh Tiền:
                    </Typography>
                    <Typography
                      variant="h5"
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {`${
                        totalAmount == 0
                          ? totalAmount
                          : totalAmount.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            })
                      } VND`}
                    </Typography>
                    <Button
                      size="medium"
                      variant="contained"
                      style={{ backgroundColor: "#FC9C55" }}
                      onClick={handleCheckOut}
                    >
                      Mua Sản Phẩm
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
