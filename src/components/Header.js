"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { logout, useAuthContext } from "@/contexts/AuthContext";
import { logoutUser } from "@/api/Auth";
import { setLoadingFail, useProductContext } from "@/contexts/ProductContext";
import { loadingCarts, setCarts, useCartContext } from "@/contexts/CartContext";
import { getList } from "@/api/CartClient";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { AccountBox, ListAlt, Person, Visibility } from "@mui/icons-material";

const links = [
  { name: "Trang Chủ", href: "/" },
  { name: "Dịch Vụ", href: "/service_pet" },
  { name: "Sản Phẩm", href: "/products" },
  { name: "Bài Viết", href: "/blogs" },
];

const actions = [
  { icon: <AccountBox />, name: "Thông tin Account", href: "profile/info" },
  { icon: <ListAlt />, name: "Danh Sách Đơn Hàng", href: "/list_order" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAuthContext();
  const { cartState, dispatchCart } = useCartContext();
  const { isLoggedIn, user } = state;
  const { cartList } = cartState;

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
  };

  console.log("user", user);

  const fetchCart = useCallback(async () => {
    if (isLoggedIn) {
      dispatchCart(loadingCarts());
      const response = await getList();
      if (response.success) {
        dispatchCart(setCarts(response));
      } else {
        dispatchCart(setLoadingFail(response));
      }
    }
  }, [dispatchCart, isLoggedIn]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="p-2 py-4 bg-white border rounded-b-2xl shadow-lg z-50 fixed top-0 left-0 right-0">
      <div className="flex justify-between">
        <div className="justify-center flex items-center px-4">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo Shop" width={150} height={150} />
            <p className="font-bold text-[#CA9D7C] text-center text-2xl">
              TuTiPet Shop
            </p>
          </Link>
        </div>

        <div className="flex justify-end items-end">
          <div></div>
          <nav className="h-[50%] flex flex-row justify-center items-center p-2">
            {links.map((link, index) => {
              return (
                <Link key={index} href={link.href}>
                  <div
                    className={clsx("mx-2 flex-none py-2 px-5 rounded-md", {
                      "bg-[#B45F30]": pathname === link.href,
                      "bg-[#CA9D7C] hover:bg-[#B45F30]": pathname !== link.href,
                    })}
                  >
                    <p className="hidden md:block text-white text-sm font-medium uppercase">
                      {link.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-row px-4 py-6">
          <Link
            href={"/carts"}
            className="px-6 flex justify-center items-center rounded-md mx-2 border-2 "
          >
            <span role="img" aria-label="Shopping Cart" className="text-2xl">
              🛒
            </span>
            {isLoggedIn ? (
              <div className="bg-red-500 w-5 h-5 mb-6 rounded-full flex justify-center items-center">
                <p className="text-center text-white text-xs">
                  {cartList.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex justify-center items-center rounded-md mx-2"
            >
              <span className="text-sm font-semibold uppercase text-black md:text-lg">
                Đăng Xuất
              </span>
            </button>
          ) : (
            <Link
              href={"/login"}
              className="flex justify-center items-center rounded-md mx-2"
            >
              <span className="text-sm font-semibold uppercase text-black md:text-lg">
                Đăng Nhập
              </span>
            </Link>
          )}
          {isLoggedIn && (
            <Box>
              <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{
                  position: "fixed",
                  bottom: 16,
                  right: 16,
                  zIndex: 11,
                }}
                icon={
                  <div
                    style={{
                      backgroundColor: "#FC9C55",
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Person />
                  </div>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => router.push(action.href)}
                  />
                ))}
                {user.role === "ADMIN" && (
                  <SpeedDialAction
                    key={"View Admin"}
                    icon={<Visibility />}
                    tooltipTitle={"View Admin"}
                    onClick={() => router.push("/dashboard")}
                  />
                )}
              </SpeedDial>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
