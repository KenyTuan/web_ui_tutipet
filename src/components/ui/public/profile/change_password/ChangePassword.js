"use client";
import { setUser, useAuthContext } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
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
import { changePassword, updateProfile } from "@/api/Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {
  const { state, dispatch } = useAuthContext();
  const { user } = state;
  const [success, setSuccess] = useState(false);
  const [modified, setModified] = useState(false);
  const [gender, setGender] = useState(user?.gender ?? "FEMALE");
  const [fullName, setFullName] = useState(user?.fullName);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordOldError, setPasswordOldError] = useState(false);
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewError, setPasswordNewError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setGender(user?.gender);
    setFullName(user?.fullName);
  }, [user?.fullName, user?.gender]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordOldChange = (e) => {
    setPasswordOld(e.target.value);
    if (e.target.validity.valid) {
      setPasswordOldError(false);
    } else {
      setPasswordOldError(true);
    }
  };

  const handlePasswordNewChange = (e) => {
    setPasswordNew(e.target.value);
    if (e.target.validity.valid) {
      setPasswordNewError(false);
    } else {
      setPasswordNewError(true);
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.validity.valid) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== passwordNew) {
      setConfirmPasswordError(true);
      return;
    }
    if (e.target.checkValidity()) {
      changePassword({ newPassword: passwordNew, oldPassword: passwordOld })
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
            Đổi Mật Khẩu
          </Typography>
          <Box height={10} />
          <Divider />
          <Box
            sx={{ padding: 3 }}
            component={"form"}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  label="Mật khẩu của bạn"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  value={passwordOld}
                  onChange={handlePasswordOldChange}
                  error={passwordOldError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    pattern:
                      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=S+$).{8,20}$",
                  }}
                  color={passwordOldError ? "error" : "success"}
                  helperText={
                    passwordOldError ? "Mật khẩu của bạn cần mạnh hơn!" : ""
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  label="Mật khẩu mới"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={passwordNew}
                  onChange={handlePasswordNewChange}
                  error={passwordNewError}
                  inputProps={{
                    pattern:
                      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=S+$).{8,20}$",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  color={passwordNewError ? "error" : "success"}
                  helperText={
                    passwordNewError ? "Mật khẩu của bạn cần mạnh hơn!" : ""
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  label="Xác nhận mật khẩu mới"
                  variant="outlined"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handlePasswordConfirmChange}
                  error={confirmPasswordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  color={confirmPasswordError ? "error" : "success"}
                  helperText={
                    confirmPasswordError ? "Mật khẩu xác nhận không khớp!" : ""
                  }
                />
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
                      Xác Nhận
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
