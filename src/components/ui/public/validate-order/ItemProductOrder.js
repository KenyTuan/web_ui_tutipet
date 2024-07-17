"use client";
import React from "react";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function ItemProductOrder({ item }) {
  return (
    <>
      <ListItem
        alignItems="center"
        style={{ marginBottom: 8, borderWidth: 0.5, backgroundColor: "#FFF" }}
      >
        <ListItemAvatar>
          <Avatar
            sx={{ width: 100, height: 100 }}
            variant="rounded"
            alt="Remy Sharp"
            src={item.product.image ?? "/product.jpg"}
          />
        </ListItemAvatar>
        <ListItemText>
          <Box padding={1} paddingX={2}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 1,
                fontStyle: "italic",
              }}
            >
              {item.product?.name}
            </Typography>
            <Stack
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"end"}
              paddingX={2}
            >
              <Typography variant="body2" fontStyle={"italic"} fontWeight={100}>
                x{item.quantity ?? 0}
              </Typography>
            </Stack>
            <Stack
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"end"}
              paddingX={2}
            >
              <Typography variant="body2" paddingX={2} textAlign={"end"}>
                Đơn giá
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700, textAlign: "end" }}
              >
                {item?.product?.discount ?? 0}.000 VND
              </Typography>
            </Stack>

            <Stack
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"end"}
              paddingX={2}
            >
              <Typography variant="body2" paddingX={2}>
                Thành Tiền
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                {item?.quantity * item?.product?.discount}.000 VND
              </Typography>
            </Stack>
          </Box>
        </ListItemText>
      </ListItem>
    </>
  );
}
