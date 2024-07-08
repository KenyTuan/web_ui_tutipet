import ListOrder from "@/components/ui/public/list_order/ListOrder";
import { Box } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Box sx={{ width: "100%", typography: "body1", marginTop: 5 }}>
      <ListOrder />
    </Box>
  );
}
