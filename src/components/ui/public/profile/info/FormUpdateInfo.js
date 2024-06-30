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
import React, { useState } from "react";

export default function FormUpdateInfo({ open, setOpen }) {
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

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
            {"Nhập Thông Tin Người Dùng"}
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
                    <Select displayEmpty value={gender}>
                      <MenuItem value="">
                        <em>Chọn Giới Tính</em>
                      </MenuItem>
                      <MenuItem value="1">Nam</MenuItem>
                      <MenuItem value="0">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Số nhà/Tên đường"
                    value={address}
                    onChange={handleAddressChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Số Điện Thoại"
                    value={phone}
                    onChange={handlePhoneChange}
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
