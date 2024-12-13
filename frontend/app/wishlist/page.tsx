"use client";
import BreadCrumb from "@/components/templates/BreadCrumb";
import Meta from "@/components/templates/Meta";
import { useProduct } from "@/context/ProductContext";
import { useUser } from "@/context/UserContext";
import { CloseOutlined, DeleteFilled } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";

const Wishlist = () => {
  const { wish, RemoveFromWish } = useProduct();
  const {user : userData  , AddtoCart, isInCart } = useUser()

  const router = useRouter();
  

  // setTimeout(() => {
  //   if (userData === null) {
  //     router.replace("/login");
  //   }
  // }, 1000);

  return (
    <div dir="rtl" className="w-full md:w-[95%] mx-auto p-2 font-VazirMedium">
      <Meta title={"علاقه مندی ها"} />
      <BreadCrumb title="علاقه مندی ها" />
      {wish && wish.length === 0 && (
        <div className="text-center text-red-600 text-lg py-8 font-VazirBold">
          شما علاقه مندی های خود را ثبت نکرده اید
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
        {wish &&
          wish?.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div className="flex mt-4 flex-col bg-white border-x  relative">
                  <div className="w-full ">
                    <img
                      src={
                        item?.images[0]?.url
                          ? item?.images[0]?.url
                          : "https://via.placeholder.com/600x400"
                      }
                      alt="product image"
                      className="w-[240px] mx-auto h-[200px] rounded-md"
                    />
                  </div>

                  <div dir="rtl" className="flex justify-end flex-col gap-1">
                    <p className="text-md mx-auto mt-3  text-slate-950 font-VazirBold line-clamp-1">
                      {item?.title}
                    </p>
                    <ReactStars
                      count={5}
                      size={16}
                      value={parseInt(item?.totalrating)}
                      edit={false}
                      className="text-center flex justify-center  items-center"
                      color1="#ffd700"
                    />
                    <div
                      dir="rtl"
                      className="flex mx-auto flex-row justify-between"
                    >
                      <div className="gap-1">
                        <span className="text-md mx-auto text-slate-950 font-VazirBold">
                          {item?.price.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-xs">تومان</span>
                      </div>

                      <button
                        className="text-sm absolute top-3 left-3 font-bold text-slate-800"
                        onClick={() => RemoveFromWish(item._id)}
                      >
                        <CloseOutlined
                          style={{
                            color: "white",
                            fontSize: "15px",
                            backgroundColor: "gray",
                            padding: "5px",
                            borderRadius: "50%",
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  {isInCart(item._id) ? (
                    <Link
                      href="/cart"
                      className="bg-sky-600 mt-2 text-sm text-white py-2 rounded-lg mx-auto w-68 px-2"
                    >
                      برو به سبد خرید
                    </Link>
                  ) : (
                    <button
                      onClick={() => AddtoCart(item)}
                      className="bg-red-600 mt-2 text-sm text-white py-2 rounded-lg mx-auto w-68 px-2"
                    >
                      افزودن به سبد
                    </button>
                  )}

                  <hr className="mt-4 text-lg" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Wishlist;
