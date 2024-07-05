import { addProduct, updateProduct } from "@/api/ProductClient";
import { setProduct, useProductContext } from "@/contexts/ProductContext";
import { useProductTypeContext } from "@/contexts/ProductTypeContext";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FormUpdatePromotion({
  item,
  open,
  handleClose,
  setSuccess,
  setMessage,
  setSeverity,
}) {
  const { dispatch } = useProductContext();
  const { productTypeState } = useProductTypeContext();
  const { productTypeList } = productTypeState;
  const [name, setName] = useState(item.name);
  const [nameError, setNameError] = useState(false);
  const [pet, setPet] = useState(item?.type?.petTypes);
  const [type, setType] = useState(item?.type?.id);
  const [price, setPrice] = useState(item?.price);
  const [priceError, setPriceError] = useState(false);
  const [description, setDescription] = useState(item?.description ?? "");
  const [descriptionError, setDescriptionError] = useState(false);
  const [info, setInfo] = useState(item?.info ?? "");
  const [infoError, setInfoError] = useState(false);
  const [img, setImg] = useState(item?.image);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  console.log("image", item.image);
  useEffect(() => {
    setPet(item?.type.petTypes);
    setType(item?.type.id);
    setImg(item?.image);
    console.log("hhhhh", item.image);
  }, [item?.type.petTypes, item?.type.id, item?.image]);

  const postImage = async (base64String) => {
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=58240beb2987602ef6ecc2cdb3488c29`,
        {
          image: base64String.replace(
            /^data:image\/(png|jpeg|jpg|webp);base64,/,
            ""
          ),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      console.log("image: ", res);

      if (res.status !== 200) {
        setUploadError("Failed to upload image");
        setUploading(false);
        return false;
      }

      setUploading(false);
      setUploadProgress(0);
      return res.data.data.url;
    } catch (error) {
      console.error("error", error);
      setUploadError("Failed to upload image");
      setUploading(false);
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

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const fileSizeLimit = 32 * 1024 * 1024;

    if (file.size > fileSizeLimit) {
      setMessage("Kích thước file vượt quá giới hạn (32MB)");
      setSeverity("error");
      setSuccess(true);
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;
      const img = await postImage(base64String);
      if (!img) {
        setMessage("Lỗi hệ thống chưa thể upload hình!");
        setSeverity("error");
        setSuccess(true);
        return;
      }

      setImg(img);
      console.log("Base64 encoded image:", base64String);
    };
    reader.readAsDataURL(file);
    console.log("file:", file);
  };

  console.log("img", img);

  const resetForm = () => {
    setName(item?.name);
    setNameError(false);
    setPet(item.type.petTypes);
    setType(item.type.id);
    setPrice(item.price);
    setPriceError(false);
    setDescription(item.description);
    setDescriptionError(false);
    setInfo(item.info);
    setInfoError(false);
    setImg(item.image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      console.log("ssss");

      if (!type) {
        setMessage("Vui lòng chọn loại sản phẩm");
        setSeverity("error");
        setSuccess(true);
        return;
      }
      if (!img) {
        setMessage("Vui lòng chọn hình cho sản phẩm");
        setSeverity("error");
        setSuccess(true);
        return;
      }
      updateProduct(
        {
          name,
          price,
          description,
          info,
          img,
          type_id: type,
        },
        item.id
      ).then((res) => {
        console.log("ssss");
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
      setSuccess(true);
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
                    value={pet || "DOG"}
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
                    value={description || ""}
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
                    value={info || ""}
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
                  <Stack
                    direction={"row"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TextField
                      variant="standard"
                      type="file"
                      onChange={handleChangeFile}
                      fullWidth
                    />
                    {uploading && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )}
                    {!uploading && img && (
                      <CardActionArea>
                        <CardMedia
                          src={img ?? "/product.jpg"}
                          component="img"
                          height={12}
                          style={{ height: "8rem", objectFit: "contain" }}
                          alt="hình cún con"
                        />
                      </CardActionArea>
                    )}
                    {uploadError && (
                      <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {uploadError}
                      </Typography>
                    )}
                    {uploading && (
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >{`Đang tải: ${uploadProgress}%`}</Typography>
                      </Box>
                    )}
                  </Stack>
                  {uploading && (
                    <Box sx={{ width: "100%", mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >{`Đang tải: ${uploadProgress}%`}</Typography>
                    </Box>
                  )}
                  {uploadError && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                      {uploadError}
                    </Typography>
                  )}
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
