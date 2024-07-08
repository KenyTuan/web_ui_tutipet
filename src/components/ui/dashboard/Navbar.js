import React, { useCallback, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MuiAppBar from "@mui/material/AppBar";
import { useAppStore } from "./appStore";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import {
  loadingManagerProductSuceess,
  loadingProducts,
  setLoadingFail,
  useProductContext,
} from "@/contexts/ProductContext";
import { fetchAllProducts } from "@/api/ProductClient";
import {
  loadingFail,
  loadingProductTypes,
  setProductTypes,
  useProductTypeContext,
} from "@/contexts/ProductTypeContext";
import { fetchListProductType } from "@/api/ProductTypeClient";
import {
  loadingFailPromotion,
  loadingManagerPromotionSuceess,
  loadingPromotions,
  usePromotionContext,
} from "@/contexts/PromotionContext";
import { fetchAllPromotion } from "@/api/PromotionClient";
import {
  loadingFailOrder,
  loadingManagerOrderSuceess,
  loadingOrders,
  useOrderContext,
} from "@/contexts/OrderContext";
import { fetchAllOrder } from "@/api/OrderClient";
import {
  loadingManagerUserSuceess,
  loadingUsers,
  useUserContext,
} from "@/contexts/UserContext";
import { fetchList } from "@/api/UserClient";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const { dispatch } = useProductContext();
  const { dispatchProductType } = useProductTypeContext();
  const { dispatchPromotion } = usePromotionContext();
  const { dispatchOrder } = useOrderContext();
  const { dispatchUser } = useUserContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const menuId = "primary-search-account-menu";

  const fetchProducts = useCallback(async () => {
    dispatch(loadingProducts());

    const response = await fetchAllProducts();
    if (response.success) {
      dispatch(loadingManagerProductSuceess(response));
    } else {
      dispatch(setLoadingFail(response));
    }
  }, [dispatch]);

  const fetchUsers = useCallback(async () => {
    dispatch(loadingUsers());

    const response = await fetchList();
    if (response.success) {
      dispatch(loadingManagerUserSuceess(response));
    } else {
      dispatch(setLoadingFail(response));
    }
  }, [dispatch]);

  const fetchPromotion = useCallback(async () => {
    dispatchPromotion(loadingPromotions());

    const response = await fetchAllPromotion();
    if (response.success) {
      dispatchPromotion(loadingManagerPromotionSuceess(response));
    } else {
      dispatchPromotion(loadingFailPromotion(response));
    }
  }, [dispatchPromotion]);

  const fetchOrder = useCallback(async () => {
    dispatchOrder(loadingOrders());

    const response = await fetchAllOrder();
    if (response.success) {
      dispatchOrder(loadingManagerOrderSuceess(response));
    } else {
      dispatchOrder(loadingFailOrder(response));
    }
  }, [dispatchOrder]);

  const fetchProductTypes = useCallback(async () => {
    dispatchProductType(loadingProductTypes());

    const response = await fetchListProductType();
    if (response.success) {
      dispatchProductType(setProductTypes(response));
    } else {
      dispatchProductType(loadingFail(response));
    }
  }, [dispatchProductType]);

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
    fetchPromotion();
    fetchOrder();
    fetchUsers();
  }, [
    fetchOrder,
    fetchProductTypes,
    fetchProducts,
    fetchPromotion,
    fetchUsers,
  ]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link href={"/"}>View Public</Link>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link href={"/"}>TUTIPET</Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
