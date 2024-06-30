"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormUpdateInfo from "./FormUpdateInfo";

export default function InfoUser() {
  const { state, dispatch } = useAuthContext();
  const { isLoggedIn, user } = state;
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormUpdateInfo open={open} setOpen={setOpen} />
      <Paper elevation={3}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" fontWeight={700} align="center">
            Thông Tin Cá Nhân
          </Typography>
          <Box height={10} />
          <Divider />
          <Box sx={{ padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Họ Tên:
                </Typography>
                <Typography variant="body1" fontStyle={"italic"} paddingX={1}>
                  {user?.name}
                </Typography>
              </Grid>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Giới Tính:
                </Typography>
                <Typography variant="body1" fontStyle={"italic"} paddingX={1}>
                  {user?.gender ? "Nam" : "Nữ"}
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Email:
                </Typography>
                <Typography variant="body1" fontStyle={"italic"} paddingX={1}>
                  {user?.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  height={50}
                  paddingLeft={15}
                  paddingRight={15}
                >
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => setOpen(true)}
                    style={{ backgroundColor: "#FC9C55" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 14, fontWeight: 700 }}
                    >
                      Cập Nhật Thông Tin
                    </Typography>
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
