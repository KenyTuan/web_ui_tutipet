import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

export default function DiaLog({
  open,
  setOpen,
  handleAccept,
  title,
  message,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            fullWidth
            sx={{
              fontSize: 16,
              fontWeight: "600",
              margin: 2,
              backgroundColor: "gray",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            onClick={handleAccept}
            autoFocus
            fullWidth
            sx={{
              fontSize: 16,
              fontWeight: "600",
              margin: 2,
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "lightcoral",
              },
            }}
          >
            Đồng ý
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
