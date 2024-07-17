"use client";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  CalendarMonth,
  Category,
  Dashboard,
  Person2Outlined,
  Redeem,
  Settings,
  ShoppingCart,
  VolunteerActivism,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppStore } from "./appStore";
import Navbar from "./Navbar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const page = [
  {
    name: "Dash Board",
    icon: Dashboard,
    href: "/dashboard",
  },
  {
    name: "Sản Phẩm",
    icon: Category,
    href: "/dashboard/products",
  },
  // {
  //   name: "Dịch Vụ",
  //   icon: VolunteerActivism,
  //   href: "/dashboard/services",
  // },
  {
    name: "Chương Trình",
    icon: Redeem,
    href: "/dashboard/promotions",
  },
  {
    name: "Thành Viên",
    icon: Person2Outlined,
    href: "/dashboard/users",
  },
  {
    name: "Đặt Hàng",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
  // {
  //   name: "Lịch Hẹn",
  //   icon: CalendarMonth,
  //   href: "/dashboard/appointments",
  // },
  // {
  //   name: "Thiết Lập",
  //   icon: Settings,
  //   href: "/dashboard/setting",
  // },
];

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebav({ children }) {
  const theme = useTheme();
  const router = useRouter();
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);

  return (
    <div>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <StyledDrawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => updateOpen(!open)}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {page.map((data, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push(data.href)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <data.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={data.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </StyledDrawer>
        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </div>
  );
}
