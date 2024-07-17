"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useOrderContext } from "@/contexts/OrderContext";
import dayjs from "dayjs";
import ItemTabOrder from "./ItemTabOrder";

export default function ListOrder() {
  const { orderState, dispatchOrder } = useOrderContext();
  const { orderList } = orderState;

  console.log("orderList", orderList);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Paper elevation={2}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ width: 200 }} label="Chờ Duyệt" value="1" />
              <Tab sx={{ width: 200 }} label="Đã Duyệt" value="2" />
              <Tab sx={{ width: 200 }} label="Đang Giao" value="3" />
              <Tab sx={{ width: 200 }} label="Đã Hủy" value="4" />
              <Tab sx={{ width: 200 }} label="Đã Nhận" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {orderList
              .filter((i) => i.status == "OPEN")
              .map((item, index) => {
                return <ItemTabOrder key={item.id} item={item} index={index} />;
              })}
          </TabPanel>
          <TabPanel value="2">
            {orderList
              .filter((i) => i.status == "SUBMITTED")
              .map((item, index) => {
                return <ItemTabOrder key={item.id} item={item} index={index} />;
              })}
          </TabPanel>
          <TabPanel value="3">
            {orderList
              .filter((i) => i.status == "ON_DELIVERY")
              .map((item, index) => {
                return <ItemTabOrder key={item.id} item={item} index={index} />;
              })}
          </TabPanel>
          <TabPanel value="4">
            {orderList
              .filter((i) => i.status === "PAID")
              .map((item, index) => {
                return <ItemTabOrder key={item.id} item={item} index={index} />;
              })}
          </TabPanel>
          <TabPanel value="5">
            {orderList
              .filter((i) => i.status == "DONE")
              .map((item, index) => {
                return <ItemTabOrder key={item.id} item={item} index={index} />;
              })}
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  );
}
