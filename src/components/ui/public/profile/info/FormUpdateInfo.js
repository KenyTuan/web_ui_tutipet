import { fetchByid, updateUser } from "@/api/UserClient";
import { setUser, useAuthContext } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function FormUpdateInfo({ open, setOpen }) {
  const { state, dispatch } = useAuthContext();
  const { isLoggedIn, user } = state;

  const [error, setError] = useState("");
  const [gender, setGender] = useState(user?.gender);
  const [fullName, setFullName] = useState(user?.name);

  useEffect(() => {
    setGender(user?.gender);
    setFullName(user?.name);
  }, [user?.name, user?.gender]);

  const handleAccept = () => {
    if (!fullName) {
      setError("vui lòng nhập họ tên!");
      return;
    }
    if (fullName.length < 5) {
      setError("họ tên phải gồm 5 ký tự trở lên!");
      return;
    }
    updateUser(user.id, { gender, fullName, email: user.email })
      .then(() => fetchByid(user.id))
      .then((res) => {
        dispatch(
          setUser({ ...user, name: res.data.name, gender: res.data.gender })
        );
        setOpen(false);
      });
  };

  return (
    <>
      <Box>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle fontWeight={"bold"}>
            {"Cập Nhật Thông Tin Người Dùng"}
          </DialogTitle>
          <Box height={10} />
          <DialogContent>
            <Box width={500}>
              {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      value={gender || -1}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value={true}>Nam</MenuItem>
                      <MenuItem value={false}>Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Họ và tên"
                    value={fullName || ""}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#FC9C55" }}
              onClick={handleAccept}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: 14, fontWeight: 700 }}
              >
                Xác Nhận
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
