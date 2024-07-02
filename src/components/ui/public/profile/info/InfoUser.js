"use client";
import { setUser, useAuthContext } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchUserByid } from "@/api/UserClient";
import { storeUserInfo } from "@/api/Config";
import AlertNotication from "@/components/AlertNotication";
import { updateProfile } from "@/api/Auth";

export default function InfoUser() {
  const { state, dispatch } = useAuthContext();
  const { user } = state;
  const [success, setSuccess] = useState(false);
  const [modified, setModified] = useState(false);
  const [gender, setGender] = useState(user?.gender ?? "FEMALE");
  const [fullName, setFullName] = useState(user?.fullName);
  const [message, setMessage] = useState("");
  const [fullNameError, setFullNameError] = useState(false);

  useEffect(() => {
    setGender(user?.gender);
    setFullName(user?.fullName);
  }, [user?.fullName, user?.gender]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (e.target.validity.valid) {
      setFullNameError(false);
    } else {
      setFullNameError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      updateProfile({ gender, fullName })
        .then(() => fetchUserByid(user.id))
        .then((res) => {
          dispatch(
            setUser({
              ...user,
              fullName: res.data.fullName,
              gender: res.data.gender,
            })
          );
          storeUserInfo(res.data);
          setMessage("Đã cập nhật thành công!");
          setSuccess(true);
        });
    } else {
      setMessage("Vui lòng kiểm tra lại!");
      setSuccess(false);
    }
  };

  return (
    <>
      <AlertNotication
        severity={success ? "success" : "error"}
        setSuccess={setSuccess}
        success={success}
        message={message}
      />
      <Paper elevation={3}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" fontWeight={700} align="center">
            Thông Tin Cá Nhân
          </Typography>
          <Box height={10} />
          <Divider />
          <Box
            sx={{ padding: 3 }}
            component={"form"}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Email:
                </Typography>
                <Typography variant="body1" fontStyle={"italic"} paddingX={1}>
                  {user?.email}
                </Typography>
              </Grid>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Họ Tên:
                </Typography>
                {!modified ? (
                  <>
                    <Typography
                      variant="body1"
                      fontStyle={"italic"}
                      paddingX={1}
                    >
                      {user?.fullName}
                    </Typography>
                    <Button variant="text" onClick={() => setModified(true)}>
                      thay đổi
                    </Button>
                  </>
                ) : (
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    value={fullName || ""}
                    onChange={handleFullNameChange}
                    error={fullNameError}
                    inputProps={{
                      pattern: "^[a-zA-ZÀ-ỹ\\s]{5,}$",
                      style: {
                        padding: "2px 8px",
                        fontSize: "16px",
                      },
                    }}
                    color={fullNameError ? "error" : "success"}
                    helperText={fullNameError ? "Vui lòng nhập họ tên!" : ""}
                  />
                )}
              </Grid>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <Typography variant="body1" fontWeight={"bold"} paddingX={1}>
                  Giới Tính:
                </Typography>
                <RadioGroup
                  name="gender"
                  row
                  value={gender || "FEMALE"}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value={"FEMALE"}
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value={"MALE"}
                    control={<Radio />}
                    label="Nam"
                  />
                </RadioGroup>
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
                    type="submit"
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
