"use client";
import { usePromotionContext } from "@/contexts/PromotionContext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import ItemPromotion from "./ItemPromotion";

export default function ListPromotion() {
  const [value, setValue] = useState("1");
  const { promotionState, dispatchPromotion } = usePromotionContext();
  const { promotionList } = promotionState;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value} className="w-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FF6600",
            },
          }}
        >
          <Tab
            className="w-1/2"
            style={{
              "&.Mui-selected": {
                borderColor: "white",
              },
            }}
            sx={{
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#FF6600",
              },
              color: "gray",
            }}
            label="Diễn Ra"
            value="1"
          />
          <Tab
            className="w-1/2"
            sx={{
              width: "50%",
              "&.Mui-selected": {
                color: "#FF6600",
              },
              color: "gray",
              fontWeight: "bold",
            }}
            label="Sắp Diễn Ra"
            value="2"
          />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Grid container spacing={2}>
          {promotionList.lenght !== 0 &&
            promotionList.map((item) => (
              <ItemPromotion item={item} key={item.id} />
            ))}
        </Grid>
      </TabPanel>
      <TabPanel value="2"></TabPanel>
    </TabContext>
  );
}
