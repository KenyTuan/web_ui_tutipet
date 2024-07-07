"use client";
import {
  resetInfoSelection,
  setDistricts,
  setProvinces,
  setSelectedDistricts,
  setSelectedProvinces,
  setSelectedWards,
  setWards,
  useLocationContext,
} from "@/contexts/LocationContext";
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
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const isPhone = (phone) => /(03|05|07|08|09|01[2689])[0-9]{8}\b/.test(phone);

export default function FormInfoOrder({ open, setOpen, setInfo }) {
  const { locationState, dispatchLocation } = useLocationContext();
  const {
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  } = locationState;
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  console.log(provinces);

  const fetchProvinces = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province/"
      );
      const data = response.data;

      const modifiedProvinces = data.results.map((province) => {
        if (province.province_name.includes("Tỉnh ")) {
          province.province_name = province.province_name.replace("Tỉnh ", "");
        } else if (province.province_name.includes("Thành phố ")) {
          province.province_name = province.province_name.replace(
            "Thành phố ",
            "TP. "
          );
        }
        return province;
      });

      const sortedProvinces = modifiedProvinces
        .slice()
        .sort((a, b) => a.province_name.localeCompare(b.province_name));
      dispatchLocation(setProvinces(sortedProvinces));
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  }, [dispatchLocation]);

  const fetchDistrict = async (id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${id.province_id}`
      );
      dispatchLocation(setDistricts(response));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWard = async (id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${id.district_id}`
      );
      dispatchLocation(setWards(response));
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value !== selectedProvince) {
      dispatchLocation(setSelectedProvinces(value));
      dispatchLocation(setSelectedDistricts(""));
      dispatchLocation(setSelectedWards(""));
      fetchDistrict(value);
    }
  };

  const handleChangeDistricts = (event) => {
    const value = event.target.value;
    if (value !== selectedDistrict) {
      dispatchLocation(setSelectedDistricts(value));
      dispatchLocation(setSelectedWards(""));
      fetchWard(value);
    }
  };

  const handleChangeWards = (event) => {
    const value = event.target.value;
    dispatchLocation(setSelectedWards(value));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    if (!selectedProvince) {
      setError("Please select a province.");
      return;
    }
    if (!selectedDistrict) {
      setError("Please select a district.");
      return;
    }
    if (!selectedWard) {
      setError("Please select a ward.");
      return;
    }
    if (!address) {
      setError("Please enter your address.");
      return;
    }
    if (!phone || !isPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    const addressSuccess =
      address.trim() +
      ", " +
      selectedWard.ward_name +
      ", " +
      selectedDistrict.district_name +
      ", " +
      selectedProvince.province_name;
    setInfo({ phone: phone, address: addressSuccess });
    dispatchLocation(resetInfoSelection());
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontWeight={"bold"}>
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
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      displayEmpty
                      value={selectedProvince}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Chọn Tỉnh/Thành phố</em>
                      </MenuItem>
                      {provinces?.map((province) => (
                        <MenuItem value={province} key={province?.province_id}>
                          {province?.province_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectedProvince !== "" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        displayEmpty
                        value={selectedDistrict}
                        onChange={handleChangeDistricts}
                      >
                        <MenuItem value="">
                          <em>Chọn Quận/Huyện</em>
                        </MenuItem>
                        {districts?.map((district) => (
                          <MenuItem
                            value={district}
                            key={district?.district_id}
                          >
                            {district?.district_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {selectedProvince !== "" && selectedDistrict !== "" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedWard}
                        onChange={handleChangeWards}
                        placeholder="Chọn Xã/Phường"
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Chọn Xã/Phường</em>
                        </MenuItem>
                        {wards.map((ward) => (
                          <MenuItem value={ward} key={ward?.ward_id}>
                            {ward?.ward_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    id="filled-hidden-label-small"
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
                    id="filled-hidden-label-small"
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
