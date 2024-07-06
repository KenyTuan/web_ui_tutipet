import { addProduct, updateProduct } from "@/api/ProductClient";
import { setProduct, useProductContext } from "@/contexts/ProductContext";
import { useProductTypeContext } from "@/contexts/ProductTypeContext";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SeletedProduct from "./SeletedProduct";
import dayjs from "dayjs";
import {
  acctionAddPromotion,
  acctionUpdatePromotion,
  usePromotionContext,
} from "@/contexts/PromotionContext";
import { fetchPromotionByid, updatePromotion } from "@/api/PromotionClient";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormUpdatePromotion({
  item,
  open,
  handleClose,
  setSuccess,
  setMessage,
  setSeverity,
  index,
}) {
  const minDateTime = useMemo(() => {
    return dayjs().add(1, "day").startOf("day").format("YYYY-MM-DDTHH:mm");
  }, []);
  const [openSelection, setOpenSelection] = useState(false);
  const handleOpenSelection = () => setOpenSelection(true);
  const handleCloseSelection = () => setOpenSelection(false);
  const [productSelected, setProductSelected] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [fromTimeError, setFromTimeError] = useState(false);
  const [toTime, setToTime] = useState("");
  const [minToTime, setMinToTime] = useState(minDateTime);
  const [toTimeError, setToTimeError] = useState(false);
  const [target, setTarget] = useState("");
  const [targetError, setTargetError] = useState(false);
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const [discountTypeError, setDiscountTypeError] = useState(false);
  const [error, setError] = useState("");
  const { dispatchPromotion } = usePromotionContext();
  const { productState } = useProductContext();
  const { productListAdmin } = productState;

  console.log("products", item.products);

  useEffect(() => {
    const newToTime = dayjs(item.fromTime)
      .add(1, "hour")
      .format("YYYY-MM-DDTHH:mm");
    setMinToTime(newToTime);
    setName(item.name);
    setFromTime(dayjs(item.fromTime).format("YYYY-MM-DDTHH:mm"));
    setToTime(dayjs(item.toTime).format("YYYY-MM-DDTHH:mm"));
    setTarget(item.target);
    setDiscountType(item.discountType);
    setValue(item.value);
    setProductSelected(item.products || []);
  }, [
    item.discountType,
    item.fromTime,
    item.name,
    item.products,
    item.target,
    item.toTime,
    item.value,
  ]);

  const handleChangeTarget = (e) => {
    setTarget(e.target.value);
    setDiscountType("");
    setValue("");
    if (e.target.value) {
      setTargetError(false);
    } else {
      setTargetError(true);
    }
  };

  const handleChangeDiscountType = (e) => {
    setDiscountType(e.target.value);
    setValue("");
    if (e.target.value) {
      setDiscountTypeError(false);
    } else {
      setDiscountTypeError(true);
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleChangeValue = (e) => {
    const value = e.target.value;
    if (discountType === "PERCENTAGE") {
      if (value > 0 && value <= 100) {
        setValue(value);
        setValueError(false);
        return;
      } else {
        setValue(value);
        setValueError(true);
        return;
      }
    }
    setValue(value);
    if (e.target.validity.valid) {
      setValueError(false);
    } else {
      setValueError(true);
    }
  };

  const handleChangeFromTime = (e) => {
    const value = e.target.value;
    setFromTime(value);
    if (e.target.validity.valid) {
      setFromTimeError(false);
      const newToTime = dayjs(value).add(1, "hour").format("YYYY-MM-DDTHH:mm");
      setMinToTime(newToTime);
    } else {
      console.log("sss1");
      setFromTimeError(true);
    }
  };

  const handleChangeToTime = (e) => {
    setToTime(e.target.value);
    if (e.target.validity.valid) {
      setToTimeError(false);
    } else {
      setToTimeError(true);
    }
  };

  const resetForm = () => {
    setError("");
    setName(item.name);
    setFromTime(dayjs(item.fromTime).format("YYYY-MM-DDTHH:mm"));
    setToTime(dayjs(item.toTime).format("YYYY-MM-DDTHH:mm"));
    setTarget(item.target);
    setDiscountType(item.discountType);
    setValue(item.value);
    setProductSelected(item.products || []);
    setFromTimeError(false);
    setToTimeError(false);
    setNameError(false);
    setValueError(false);
    setTargetError(false);
    setDiscountTypeError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      console.log("name", nameError);
      setNameError(true);
      return;
    }
    if (!fromTime) {
      setFromTimeError(true);
      return;
    }
    if (!toTime) {
      setToTimeError(true);
      return;
    }
    if (!target) {
      setTargetError(true);
      return;
    }
    if (!discountType) {
      setDiscountTypeError(true);
      return;
    }
    if (!value) {
      setValueError(true);
      return;
    }
    if (discountType === "PERCENTAGE" && (value < 0 || value > 100)) {
      setValueError(true);
      return;
    }
    if (target === "PRODUCT" && productSelected.length === 0) {
      setError("Vui lòng chọn sản phẩm cho sự kiện!");
      return;
    }
    if (e.target.checkValidity()) {
      updatePromotion(item.id, {
        name,
        target,
        value,
        discountType,
        fromTime: dayjs(fromTime).toISOString(),
        toTime: dayjs(toTime).toISOString(),
        productIds: productSelected.map((item) => item.id),
      }).then((res) => {
        if (res.success) {
          fetchPromotionByid(res.data.id).then((res) => {
            if (res.success) {
              handleCloseForm();
              Swal.fire(
                "Thông báo!",
                `Hệ thống đã cập nhật dữ liệu thành công.`,
                "success"
              ).then(dispatchPromotion(acctionUpdatePromotion(res, index)));
            } else {
              Swal.fire("Thông báo!", `Hệ thống đã xảy ra lỗi.`, "error");
            }
          });
          return;
        } else {
          Swal.fire("Thông báo!", `Hệ thống đã xảy ra lỗi.`, "error");
          return;
        }
      });
      return;
    } else {
      setError("Vui lòng kiểm tra lại!");
      return;
    }
  };

  const handleCloseForm = () => {
    resetForm();
    handleClose();
  };

  console.log("productSelected", productSelected);

  return (
    <>
      <Modal
        open={openSelection}
        onClose={handleCloseSelection}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SeletedProduct
            handleClose={handleCloseSelection}
            setProductSelected={setProductSelected}
            productSelected={productSelected}
          />
        </Box>
      </Modal>
      <Box>
        <Dialog
          open={open}
          onClose={handleCloseForm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          component={"form"}
          onSubmit={handleSubmit}
          noValidate
        >
          <DialogTitle id="alert-dialog-title" fontWeight={"bold"}>
            {"Cập Nhật Chường Trình"}
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
          </DialogTitle>
          <Box height={10} />
          <DialogContent>
            <Box width={500}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    label="Tên Chương Trình"
                    value={name}
                    onChange={handleChangeName}
                    error={nameError}
                    color={nameError ? "error" : "success"}
                    helperText={nameError ? "Vui lòng nhập!" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Thời Gian</InputLabel>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <TextField
                      fullWidth
                      required
                      type="datetime-local"
                      variant="outlined"
                      size="small"
                      value={fromTime || ""}
                      onChange={handleChangeFromTime}
                      error={fromTimeError}
                      color={fromTimeError ? "error" : "success"}
                      helperText={fromTimeError ? "Vui lòng nhập!" : ""}
                      inputProps={{
                        min: minDateTime,
                      }}
                    />
                    <Typography variant="h4" component={"div"}>
                      -
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      disabled={!fromTime}
                      type="datetime-local"
                      variant="outlined"
                      size="small"
                      value={toTime || ""}
                      onChange={handleChangeToTime}
                      error={toTimeError}
                      color={toTimeError ? "error" : "success"}
                      helperText={toTimeError ? "Vui lòng nhập!" : ""}
                      inputProps={{
                        min: minToTime,
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={targetError}>
                    <Typography
                      variant="body2"
                      component={"div"}
                      marginBottom={1}
                      paddingLeft={1}
                    >
                      Chọn Giảm Cho
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={target}
                      onChange={handleChangeTarget}
                    >
                      <MenuItem value={""}>
                        <em>Vui lòng chọn</em>
                      </MenuItem>
                      <MenuItem value={"PRODUCT"}>Từng Sản Phẩm</MenuItem>
                      <MenuItem value={"ORDER"}>Từng Đờn Hàng</MenuItem>
                    </Select>
                    {targetError && (
                      <FormHelperText color="red">
                        Vui lòng chọn một mục.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={discountTypeError}>
                    <Typography
                      variant="body2"
                      component={"div"}
                      marginBottom={1}
                      paddingLeft={1}
                    >
                      Chọn Giảm Giá Cho
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={discountType}
                      onChange={handleChangeDiscountType}
                    >
                      <MenuItem value={""}>
                        <em>Vui lòng chọn</em>
                      </MenuItem>
                      <MenuItem value={"PERCENTAGE"}>Phần Trăm</MenuItem>
                      <MenuItem value={"SPECIFIC"}>Giá Tiền</MenuItem>
                    </Select>
                    {discountTypeError && (
                      <FormHelperText color="red">
                        Vui lòng chọn một mục.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {!!discountType && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      label="Giảm Giá"
                      size="small"
                      value={value}
                      onChange={handleChangeValue}
                      error={valueError}
                      color={valueError ? "error" : "success"}
                      helperText={valueError ? "Vui lòng nhập hớp lệ!" : ""}
                      InputProps={{
                        endAdornment:
                          discountType === "PERCENTAGE" ? (
                            <InputAdornment position="end">%</InputAdornment>
                          ) : (
                            <InputAdornment position="end">
                              .000 VND
                            </InputAdornment>
                          ),
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                  </Grid>
                )}
                {target === "PRODUCT" && productSelected?.length > 0 && (
                  <Grid item xs={12}>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 200,
                      }}
                    >
                      {productSelected.map((item) => (
                        <ListItem key={`item-${item.id}`}>
                          <ListItemAvatar>
                            <Avatar alt={item.name} src={item.image} />
                          </ListItemAvatar>
                          <ListItemText primary={`${item.name}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
                {target === "PRODUCT" && (
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      variant="contained"
                      style={{ backgroundColor: "#FC9C55" }}
                      onClick={handleOpenSelection}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 14, fontWeight: 700 }}
                      >
                        Chọn Sản Phẩm
                      </Typography>
                    </Button>
                  </Grid>
                )}
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
              type="submit"
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
