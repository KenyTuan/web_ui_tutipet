"use client";
import { Contacts, CreditCard, LockReset } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = React.useState(pathname);
  const router = useRouter();

  const handleListItemClick = (event, href) => {
    setSelectedIndex(href);
    router.push(href);
  };
  return (
    <>
      <Paper>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === "/profile/info"}
            onClick={(event) => handleListItemClick(event, "/profile/info")}
          >
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary="Thông Tin Cá Nhân" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === "/profile/change_password"}
            onClick={(event) =>
              handleListItemClick(event, "/profile/change_password")
            }
          >
            <ListItemIcon>
              <LockReset />
            </ListItemIcon>
            <ListItemText primary="Đổi Mật Khẩu" />
          </ListItemButton>
        </List>
      </Paper>
    </>
  );
}
