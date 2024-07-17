import { changeStautsOrder, fetchOrderByid } from "@/api/OrderClient";
import {
  acctionUpdateOrderUser,
  useOrderContext,
} from "@/contexts/OrderContext";
import {
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import Swal from "sweetalert2";
import FormView from "./FormView";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "60%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export default function ItemTabOrder({ item, index }) {
  const { orderState, dispatchOrder } = useOrderContext();
  const [open, setOpen] = useState(false);
  const handleCloseView = () => setOpen(false);
  const handleOpenView = () => setOpen(true);
  const quantity = item.productOrder.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleChangeStaus = (action) => {
    changeStautsOrder(item.id, action).then((res) => {
      if (res.success) {
        fetchOrderByid(res.data.id).then((res) => {
          if (res.success) {
            Swal.fire(
              "Thông Báo",
              `Hệ thống đã cập nhật dữ liệu này.`,
              "success"
            ).then(dispatchOrder(acctionUpdateOrderUser(res, index)));
            return;
          } else {
            Swal.fire("Thông Báo", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
            return;
          }
        });
      }
      Swal.fire("Thông Báo", `Lỗi! Hệ thống đang xảy ra lỗi.`, "error");
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormView
            handleClose={handleCloseView}
            open={open}
            item={item}
            index={index}
          />
        </Box>
      </Modal>
      <Box marginBlockStart={2} className="drop-shadow-lg">
        <ListItem
          alignItems="center"
          style={{ marginBottom: 2, borderWidth: 0.5 }}
        >
          <ListItemText>
            <Box padding={1}>
              <Grid container spacing={1}>
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                  <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"end"}
                  >
                    {item.status === "OPEN" && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-xs font-semibold p-3 rounded-md shadow-lg text-white mb-2"
                        onClick={() => handleChangeStaus("PAID")}
                      >
                        Hủy Đơn
                      </button>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={11}>
                  <Box onClick={handleOpenView} className="cursor-pointer">
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize={20} className="font-bold">
                        Mã Đơn: {item.code}
                      </Typography>
                      <Typography fontSize={16} fontStyle={"italic"}>
                        {dayjs(item.orderDate).format(`DD/MM/YYYY HH[h]mm`)}
                      </Typography>
                    </Stack>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize={16}>Số lượng</Typography>
                      <Typography fontSize={16}>x{quantity}</Typography>
                    </Stack>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize={16}>Thành Tiền</Typography>
                      <Typography fontSize={16}>
                        {item.total}.000 VND
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Box>
          </ListItemText>
        </ListItem>
      </Box>
    </>
  );
}
