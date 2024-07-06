import { fetchByid, updateProduct } from "@/api/ProductClient";
import {
  acctionUpdateProduct,
  useProductContext,
} from "@/contexts/ProductContext";
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
import Swal from "sweetalert2";

export default function FormUpdateProduct({ item, open, handleClose, index }) {
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
  const [brand, setBrand] = useState(item.brand);
  const [brandError, setBrandError] = useState(false);
  const [origin, setOrigin] = useState(item.origin);
  const [originError, setOriginError] = useState(false);
  const [img, setImg] = useState(item?.image);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setPet(item?.type.petTypes);
    setType(item?.type.id);
    setImg(item?.image);
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

  const handleChangeBrand = (e) => {
    setBrand(e.target.value);

    if (e.target.validity.valid) {
      setBrandError(false);
    } else {
      setBrandError(true);
    }
  };

  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);

    if (e.target.validity.valid) {
      setOriginError(false);
    } else {
      setOriginError(true);
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
      setError("Kích thước file vượt quá giới hạn (32MB)");

      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;
      const img = await postImage(base64String);
      if (!img) {
        setError("Lỗi hệ thống chưa thể upload hình!");

        return;
      }

      setImg(img);
      console.log("Base64 encoded image:", base64String);
    };
    reader.readAsDataURL(file);
    console.log("file:", file);
  };

  const resetForm = () => {
    setName(item?.name);
    setNameError(false);
    setPet(item.type.petTypes);
    setType(item.type.id);
    setPrice(item.price);
    setPriceError(false);
    setDescription(item.description);
    setDescriptionError(false);
    setImg(item.image);
    setOrigin(item.origin);
    setOriginError(false);
    setBrand(item.brand);
    setBrandError(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      console.log("ssss");

      if (!type) {
        setError("Vui lòng chọn loại sản phẩm!");
        return;
      }
      if (!img) {
        setError("Vui lòng chọn hình cho sản phẩm của bạn!");
        return;
      }
      updateProduct(
        {
          name,
          price,
          description,
          brand,
          origin,
          img,
          typeId: type,
        },
        item.id
      ).then((res) => {
        if (res.success) {
          fetchByid(res.data.id).then((res) => {
            if (res.success) {
              handleCloseForm();
              Swal.fire(
                "Thông Báo!",
                `Hệ thống đã cập nhật dữ liệu thành công.`,
                "success"
              ).then(dispatch(acctionUpdateProduct(res, index)));
            } else {
              Swal.fire("Thông Báo!", `Hệ thống đã xảy ra lỗi.`, "error");
            }
            return;
          });
        } else {
          Swal.fire("Thông Báo!", `Hệ thống đã xảy ra lỗi.`, "error");
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
                    helperText={nameError ? "Vui lòng nhập!" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    label="Nhãn Hàng"
                    value={brand || ""}
                    onChange={handleChangeBrand}
                    error={brandError}
                    color={brandError ? "error" : "success"}
                    helperText={brandError ? "Vui lòng nhập!" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    label="Xuất xứ"
                    value={origin || ""}
                    onChange={handleChangeOrigin}
                    error={originError}
                    color={originError ? "error" : "success"}
                    helperText={originError ? "Vui lòng nhập!" : ""}
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
