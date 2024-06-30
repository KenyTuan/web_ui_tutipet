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
  Typography,
} from "@mui/material";
import ItemProductOrder from "./ItemProductOrder";
import useSearchParams from "@/hook/useSearchParams";
import axios from "axios";
import FormInfoOrder from "./FormInfoOrder";

export default function CheckOut() {
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [info, setInfo] = useState({ phone: "", address: "" });
  const [open, setOpen] = useState(false);


  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
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
                        Thông Tin Đặt Hàng
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
                              Chọn Thông Tin Nhận Hàng
                            </Typography>
                          </Button>
                        </Stack>
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
                          {totalAmount.toLocaleString("en-US", {
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
                      >
                        <Typography
                          variant="body2"
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
          </Grid>
        </Box>
      </Container>
    </>
  );
}
