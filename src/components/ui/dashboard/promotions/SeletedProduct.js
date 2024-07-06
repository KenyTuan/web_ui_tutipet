"use client";
import { useProductContext } from "@/contexts/ProductContext";
import { useProductTypeContext } from "@/contexts/ProductTypeContext";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SeletedProduct({
  handleClose,
  setProductSelected,
  productSelected,
}) {
  const [pet, setPet] = useState("CAT");
  const [type, setType] = useState("");
  const { productTypeState } = useProductTypeContext();
  const { productTypeList } = productTypeState;
  const { productState } = useProductContext();
  const { productListAdmin } = productState;
  const [checked, setChecked] = useState([]);

  console.log("productSelected", checked);

  useEffect(() => {
    setChecked([...productSelected]);
  }, [productSelected]);

  const handleChangePet = (e) => {
    setPet(e.target.value);
    setType(null);
  };

  const handleToggle = (value) => () => {
    const isChecked = checked.some((item) => item.id === value.id);

    if (!isChecked) {
      const newChecked = [...checked, value];
      setChecked(newChecked);
    } else {
      const newChecked = checked.filter((item) => item.id !== value.id);
      setChecked(newChecked);
    }
  };
  const handleAppyChecked = () => {
    setProductSelected(checked);
    handleClose();
  };

  console.log("checked", checked);

  const customList = (items) => (
    <Paper
      sx={{
        width: "100%",
        height: screen.height - (screen.height * 50) / 100,
        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          console.log(
            "first",
            checked.filter((item) => item.id === value.id)
          );
          return (
            <ListItemButton
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={
                    checked.filter((item) => item.id === value.id).length !== 0
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar alt={value.name} src={value.image} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <>
      <Box
        component="div"
        sx={{ mt: 1 }}
        height={screen.height - (screen.height * 25) / 100}
      >
        <Box>
          <Typography variant="h5" align="center" fontWeight={"600"}>
            Chọn Sản Phẩm Cho Chương Trình
          </Typography>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
        <Box height={8} />
        <Grid
          container
          spacing={2}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography
              variant="body2"
              component={"div"}
              marginBottom={1}
              paddingLeft={1}
            >
              Chọn Loại Pet
            </Typography>
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
          <Grid item xs={8}>
            <FormControl fullWidth>
              <Typography
                variant="body2"
                component={"div"}
                marginBottom={1}
                paddingLeft={1}
              >
                Chọn Loại
              </Typography>
              <Select
                fullWidth
                displayEmpty
                value={type || ""}
                onChange={(e) => setType(e.target.value)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  classes: {
                    paper: "scroll-menu",
                  },
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
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
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {customList(
              productListAdmin.filter((item) => item.type.id === type)
            )}
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="h3"
              align="center"
              marginLeft={"20%"}
              marginRight={"20%"}
            >
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-500"
                fullWidth
                onClick={handleAppyChecked}
              >
                Đồng Ý
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
