import { CreditCard, Storefront } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

export default function page() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2} direction={"row"}>
            <Card
              sx={{ minWidth: 49 + "%", height: 100 + "%" }}
              className="bg-slate-700"
            >
              <CardActionArea>
                <CardContent className="p-8">
                  <div className="text-white mb-4 ">
                    <CreditCard />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component={"div"}
                    className="text-white font-semibold "
                  >
                    500.000 VND
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component={"div"}
                    sx={{ color: "#ccd1d1" }}
                  >
                    Total Order
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{ minWidth: 49 + "%", height: 30 + "%" }}
              className="bg-slate-700"
            >
              <CardActionArea>
                <CardContent className="p-8">
                  <div className="text-white mb-4 ">
                    <CreditCard />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component={"div"}
                    className="text-white font-semibold "
                  >
                    900.000 VND
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component={"div"}
                    sx={{ color: "#ccd1d1" }}
                  >
                    Total Order
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Card className="mb-2">
            <CardActionArea>
              <CardContent className="p-2">
                <Stack spacing={2} direction={"row"}>
                  <div className="flex items-center pl-4">
                    <Storefront />
                  </div>
                  <div className="p-2">
                    <span className="font-semibold">250.000</span>
                    <br />
                    <span className="text-sm">Total Order</span>
                  </div>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className="mb-2">
            <CardActionArea>
              <CardContent className="p-2">
                <Stack spacing={2} direction={"row"}>
                  <div className="flex items-center pl-4">
                    <Storefront />
                  </div>
                  <div className="p-2">
                    <span className="font-semibold">250.000</span>
                    <br />
                    <span className="text-sm">Total Order</span>
                  </div>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
