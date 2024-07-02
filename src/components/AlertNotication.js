import { Close } from "@mui/icons-material";
import { Collapse, IconButton, Alert } from "@mui/material";
import React, { useEffect } from "react";

export default function AlertNotication({
  success,
  setSuccess,
  message,
  severity,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [setSuccess, success]);

  return (
    <Collapse
      in={success}
      style={{ position: "fixed", zIndex: 100, bottom: 0, right: 10 }}
    >
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setSuccess(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
