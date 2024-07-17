import ListPromotion from "@/components/ui/public/events/ListPromotion";
import { Box, Container, Grid, Paper, Tab, Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Container>
      <Paper elevation={2}>
        <Box sx={{ minHeight: 800 }}>
          <Grid container spacing={2} paddingX={10}>
            <Grid item xs={12} marginBottom={2}>
              <Box
                paddingY={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bgcolor={"orange"}
              >
                <Typography
                  fontSize={24}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  color={"white"}
                >
                  Chương trình giảm giá
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} border={1} paddingX={2}>
              <ListPromotion />
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Box>
      </Paper>
    </Container>
  );
}
