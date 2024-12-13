"use client";
import React, { useEffect, useState } from "react";
import Meta from "@/components/templates/Meta";
import BreadCrumb from "@/components/templates/BreadCrumb";
import { DeleteOutlined, PlusOutlined, TruckFilled } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const Cart = () => {
  const {
    user: userData,
    cart,
    RemoveFromCart,
    AddQuentity,
    RemoveQuentity,
  }: any = useUser();


  const totalAmount = cart?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  // const router = useRouter();

  // setTimeout(() => {
  //   if (userData === null) {
  //     router.replace("/login");
  //   }
  // }, 2000);

  return (
    <>
      <Meta title={"سبد خرید"} />
      <BreadCrumb title="سبد خرید" />
      <div className="w-[95%] py-4 mx-auto flex flex-col-reverse gap-3 justify-center md:flex-row">
        {cart.length ? (
          <>
            <section className="bg-white p-2 w-full flex-col gap-2 md:w-1/3">
              <div dir="rtl" className="flex flex-row  justify-between">
                <div className="flex  items-center  flex-row gap-3">
                  <span style={{ fontSize: "25px", color: "green" }}>
                    <PlusOutlined />
                  </span>
                  <span className="text-slate-700">قیمت محصولات:</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-2xl font-VazirBold">
                    {totalAmount?.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm">تومان</span>{" "}
                </div>
              </div>

              <hr className="my-2" />

              <div dir="rtl" className="flex flex-row  justify-between">
                <div className="flex  items-center  flex-row gap-3">
                  <span style={{ fontSize: "25px", color: "green" }}>
                    <PlusOutlined />
                  </span>
                  <span className="text-slate-700">هزینه ارسال:</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-green-800 font-VazirBold">
                    رایگان
                  </span>
                </div>
              </div>

              <hr className="my-2" />

              <div dir="rtl" className="flex flex-row mt-2  justify-between">
                <div className="flex  items-center  flex-row gap-3">
                  <span className="text-lg md:text-md lg:text-lg text-slate-700 font-VazirBold">
                    مبلغ قابل پرداخت :
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-2xl font-VazirBold">
                    {totalAmount?.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm">تومان</span>{" "}
                </div>
              </div>

              <div className="flex w-full justify-center">
                <Link
                  href="/checkout"
                  className="w-full py-2 font-VazirMedium text-center mt-4 bg-orange-600 text-white rounded-md"
                >
                  تایید و ادامه
                </Link>
              </div>
            </section>

            <section className="w-full bg-white flex-col gap-2 md:w-2/3">
              {cart &&
                cart?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="w-full">
                      <div
                        dir="rtl"
                        className="w-full  px-2 pt-1 gap-1 justify-end flex flex-col md:flex-row"
                      >
                        <img
                          src={
                            item?.images[0]
                              ? item?.images[0].url
                              : "/images/acc.jpg"
                          }
                          alt="watch"
                          className="w-full h-28 rounded-md px-2 md:w-32"
                        />

                        <div className="w-full flex flex-col gap-2">
                          <p className="w-full font-vazirMedium text-black font-VazirBold text-lg">
                            {item?.title}
                          </p>

                          <div className="w-full text-xs text-slate-700 items-center flex flex-row gap-1">
                            <span>
                              <TruckFilled />
                            </span>
                            <span className="text-xs">آماده ارسال</span>
                          </div>

                          <article className="w-full flex flow-row justify-between">
                            <section className="w-full flex flex-row justify-start gap-8">
                              <div className="flex flex-row bg-slate-200 rounded-md">
                                <button
                                  onClick={() => AddQuentity(item?._id)}
                                  className="px-4 py-1 font-VazirBold text-lg text-slate-900 "
                                >
                                  +
                                </button>
                                <div className="px-4 py-1 font-VazirBold  text-lg text-slate-900">
                                  {item?.quantity.toLocaleString("fa-IR")}
                                </div>
                                <button
                                  onClick={() => RemoveQuentity(item?._id)}
                                  className="px-4 py-1 font-VazirBold text-lg text-slate-900 "
                                >
                                  -
                                </button>
                              </div>

                              <DeleteOutlined
                                style={{ fontSize: "25px", color: "red" }}
                                onClick={() => RemoveFromCart(item?._id)}
                              />
                            </section>

                            <div className="flex flex-row font-VazirLight items-center gap-1">
                              <span className="text-2xl font-bold">
                                {(item?.price * item?.quantity).toLocaleString(
                                  "fa-IR"
                                )}
                              </span>
                              <span className="text-sm">تومان</span>
                            </div>
                          </article>
                        </div>
                      </div>
                      <hr className="my-1 w-[95%] mx-auto" />
                    </div>
                  );
                })}
            </section>
          </>
        ) : (
          <Image
            src="/images/empty.jpg"
            alt="watch"
            width={500}
            height={500}
            // className="w-full h-full rounded-md px-2"
          />
        )}
      </div>
    </>
  );
};

export default Cart;
