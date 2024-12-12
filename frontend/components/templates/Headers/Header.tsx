"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HeartFilled,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import Search from "./Search";
import { useSearchParams } from "next/navigation";

export function Header() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const user = useSelector((state: any) => state?.auth?.user)
  const user = Cookies.get("jwt") ? true : false;
  console.log("user", user);

  // const ToggleEvent = () => {
  //   setShow(!show);
  // };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setShow(false)
    );
  }, []);

  // searchParams
  const searchParams = useSearchParams();

  // گرفتن پارامترها از URL
  const searchParam = searchParams.get("search");

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParam]);

  

  return (
    <div className="sticky  top-0 z-50 border-0 flex flex-col w-full">
      <div className=" hidden w-full z-50 text-center justify-center py-4 text-white text-lg  bg-orange-400 md:flex">
        <Link href="/ourStore" className="">
          سفر به دنیای دیجیتال | فروشگاه
        </Link>
      </div>

      <div className=" bg-white border-b py-1 px-1 z-50   w-full  ">
        <div
          dir="rtl"
          className="container p-2 mx-auto flex items-center justify-between w-full "
        >
          <section className="flex  flex-row items-center gap-2">
            <Link href="/" className="text-red-600 text-2xl">FaredStore</Link>

            <Search />
          </section>

          <section className="flex flex-row ">
            {isClient ? (
              <>
                {user === true ? (
                  <div className="flex flex-row gap-2">
                    <Link
                      href="/profile"
                      className="px-4 py-2  tex-lg  font-bold"
                    >
                      <UserOutlined
                        style={{
                          fontSize: "20px",
                          backgroundColor: "gray",
                          color:"white",
                          padding:"10px",
                          borderRadius:"100%"
                        }}
                      />
                    </Link>

                    <Link href="/cart" className="px-2 py-2  tex-lg  font-bold">
                      <ShoppingOutlined
                       style={{
                        fontSize: "20px",
                        backgroundColor: "gray",
                        color:"white",
                        padding:"10px",
                        borderRadius:"100%"
                      }}
                      />
                    </Link>

                    <Link
                      href="/wishlist"
                      className="px-2 py-2  tex-lg  font-bold"
                    >
                      <HeartFilled
                        style={{
                          fontSize: "20px",
                          backgroundColor: "gray",
                          color:"white",
                          padding:"10px",
                          borderRadius:"100%"
                        }}
                      />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 border tex-lg items-center flex justify-center rounded-lg font-bold"
                  >
                    <LogoutOutlined
                      style={{
                        fontSize: "18px",
                        color: "black",
                      }}
                    />
                    <span className="px-2">ورود | ثبت نام</span>
                  </Link>
                )}
              </>
            ) : (
              <></>
            )}
          </section>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}

        {show ? (
          <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4"></div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
