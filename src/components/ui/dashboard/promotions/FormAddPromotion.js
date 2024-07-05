import { addProduct } from "@/api/ProductClient";
import { setProduct, useProductContext } from "@/contexts/ProductContext";
import { useProductTypeContext } from "@/contexts/ProductTypeContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { forwardRef, useState } from "react";

export default function FormAddPromotion({
  open,
  handleClose,
  setSuccess,
  setMessage,
  setSeverity,
}) {
  const { dispatch } = useProductContext();
  const { productTypeState } = useProductTypeContext();
  const { productTypeList } = productTypeState;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [pet, setPet] = useState("CAT");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [info, setInfo] = useState("");
  const [infoError, setInfoError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const postImage = async () => {
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=58240beb2987602ef6ecc2cdb3488c29`,
        {
          image: selectedFile.replace(
            /^data:image\/(png|jpeg|jpg|webp);base64,/,
            ""
          ),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("image: ", res);

      if (res.status !== 200) {
        return false;
      }
      return res.data.data.url;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  };

  const handleChangePet = (e) => {
    setPet(e.target.value);
    setType(null);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);

    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);

    if (e.target.validity.valid) {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }
  };

  const handleChangeInfo = (e) => {
    setInfo(e.target.value);
    if (e.target.validity.valid) {
      setInfoError(false);
    } else {
      setInfoError(true);
    }
  };

  const handleChangePrice = (e) => {
    if (e.target.validity.valid) {
      setPrice(formatPrice(e.target.value));
      setPriceError(false);
    } else {
      if (!e.target.value) {
        setPrice(formatPrice(e.target.value));
      }
      setPriceError(true);
    }
  };

  const formatPrice = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  console.log("price", price);

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    const fileSizeLimit = 32 * 1024 * 1024;

    if (file.size > fileSizeLimit) {
      console.error("Kích thước file vượt quá giới hạn (32MB)");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setSelectedFile(base64String);
      console.log("Base64 encoded image:", base64String);
    };
    reader.readAsDataURL(file);
    console.log("file:", file);

    setIsFilePicked(true);
  };

  const resetForm = () => {
    setName("");
    setNameError(false);
    setPet("CAT");
    setType("");
    setPrice("");
    setPriceError(false);
    setDescription("");
    setDescriptionError(false);
    setInfo("");
    setInfoError(false);
    setSelectedFile(null);
    setIsFilePicked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      if (!type) {
        setMessage("Vui lòng chọn loại sản phẩm");
        setSeverity("error");
        setSuccess(false);
        return;
      }
      if (!isFilePicked) {
        setMessage("Vui lòng chọn hình cho sản phẩm của bạn!");
        setSuccess(false);
        return;
      }
      const img = await postImage();

      if (!img) {
        setMessage("Lỗi hệ thống chưa thể upload hình!");
        setSuccess(false);
        return;
      }
      addProduct({
        name,
        price,
        description,
        info,
        img,
        type_id: type,
      }).then((res) => {
        dispatch(setProduct(res));
        setMessage("Đã cập nhật thành công!");
        setSeverity("success");
        setSuccess(true);
        handleCloseForm();
      });
      return;
    } else {
      setMessage("Vui lòng kiểm tra lại!");
      setSeverity("error");
      setSuccess(false);
      return;
    }
  };

  const handleCloseForm = () => {
    resetForm();
    handleClose();
  };

  return (
    <>
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
            {"Thêm sản phẩm mới"}
          </DialogTitle>
          <Box height={10} />
          <DialogContent>
            <Box width={500}>
              {/* {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )} */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Chọn loại thú cưng"
                    value={pet}
                    onChange={handleChangePet}
                  >
                    <MenuItem value={"CAT"}>Mèo</MenuItem>
                    <MenuItem value={"DOG"}>Chó</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={type || ""}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={""}>
                      <em>Chọn loại sản phẩm</em>
                    </MenuItem>
                    {productTypeList
                      ?.filter((item) => item.petType == pet)
                      .map((item) => (
                        <MenuItem value={item.id} key={item?.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    label="Tên Sản Phẩm"
                    value={name}
                    onChange={handleChangeName}
                    error={nameError}
                    color={nameError ? "error" : "success"}
                    helperText={nameError ? "Vui lòng nhập tên sản phẩm!" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="Giá Tiền"
                    size="small"
                    value={price}
                    onChange={handleChangePrice}
                    error={priceError}
                    color={priceError ? "error" : "success"}
                    helperText={
                      priceError ? "Vui lòng nhập giá tiền hớp lệ!" : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      onInput: (e) => {
                        e.target.value = e.target.value.replace(/\D/, "");
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    required
                    variant="outlined"
                    label="Mô Tả"
                    size="small"
                    rows={4}
                    value={description}
                    onChange={handleChangeDescription}
                    error={descriptionError}
                    color={descriptionError ? "error" : "success"}
                    helperText={
                      descriptionError ? "Vui lòng nhập mô tả sản phẩm!" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    required
                    variant="outlined"
                    label="Thông Tin Chi tiết"
                    size="small"
                    value={info}
                    rows={4}
                    onChange={handleChangeInfo}
                    error={infoError}
                    color={infoError ? "error" : "success"}
                    helperText={
                      infoError ? "Vui lòng nhập thông tin sản phẩm!" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    type="file"
                    onChange={handleChangeFile}
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
