"use client";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

export default function ItemPromotion({ item }) {
  const discount =
    item?.discountType !== "PERCENTAGE" ? `${item?.value}k` : `${item?.value}%`;
  return (
    <Grid
      item
      xs={6}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Card className="drop-shadow-xl w-11/12">
        <CardActions className="flex flex-col relative">
          <div className="p-2  rounded-md bg-red-400 absolute z-20 right-0">
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-sm text-white capitalize">
                giảm
              </span>
              <p className="text-base font-bold text-yellow-300">{discount}</p>
            </div>
          </div>

          <CardActionArea>
            <CardMedia
              sx={{ height: 150 }}
              image="/promotion.png"
              title="green iguana"
            />
            <CardContent sx={{ height: 141.6 }}>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                fontWeight={600}
                height={48}
                textAlign={"center"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.name}
              </Typography>
              <p className="font-light text-sm text-end">
                Có hiệu lực từ
                <em className="mx-1">{`${dayjs(item.fromtime).format(
                  `DD/MM/YYYY `
                )}`}</em>
                đến
                <em className="mx-1">
                  {`${dayjs(item.toTime).format(`DD/MM/YYYY `)}`}
                </em>
              </p>
              {!!item.code ? (
                <p className="font-light text-xs">
                  Lưu mã ngay: <em className="mx-1">{item.code}</em>
                </p>
              ) : (
                <p
                  className="h-4
                "
                ></p>
              )}
              <p className="text-end text-sm text-blue-500">xem thêm</p>
            </CardContent>
          </CardActionArea>
        </CardActions>
      </Card>
    </Grid>
  );
}
