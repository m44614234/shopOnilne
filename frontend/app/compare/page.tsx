"use client";

import BreadCrumb from "@/components/templates/BreadCrumb";
import Meta from "@/components/templates/Meta";
import { useProduct } from "@/context/ProductContext";
import { useUser } from "@/context/UserContext";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ReactStars from "react-stars";

const Compare = () => {
  const { compare, RemoveFromCompare } = useProduct();
  const { user: userData, AddtoCart, isInCart }: any = useUser();
  const router = useRouter();

  // setTimeout(() => {
  //   if (userData === null) {
  //     router.push("/login");
  //   }
  // }, 2000);

  return (
    <div dir="rtl" className="w-full px-4 mx-auto p-2 font-VazirMedium">
      <Meta title={"مقایسه محصولات"} />
      <BreadCrumb title="مقایسه محصولات" />
      {compare && compare.length === 0 && (
        <div className="text-center text-red-600 text-lg py-8 font-VazirBold">
          هنوز محصولی برای مقایسه انتخاب نشده است
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
        {compare &&
          compare?.map((item: any, index: any) => {
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

                      {/* <Link href={`/singleProduct/${item?._id}`} className="text-sm font-bold text-slate-800">بیشتر...</Link> */}
                      <button
                        className="text-sm absolute top-3 left-3 font-bold text-slate-800"
                        onClick={() => RemoveFromCompare(item._id)}
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

                  {item?.type === "laptop" ? (
                    <div dir="rtl" className="flex p-2 flex-col gap-7 w-full">
                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">وزن:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.weight}
                          <span className="font-VazirBlack text-xs">گرم</span>
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">ابعاد:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.dimensions}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          سازنده پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_manufacturer}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          نسل پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_generation}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          سری پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_series}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          مدل پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_model}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          محدوده سرعت پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_speed_range}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          فرکانس پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_frequency}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          cache حافظه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.cache_memory}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          RAM حافظه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.ram_memory}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          حافظه هارد دیسک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.hard_memory}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          نوع هارد دیسک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.hard_type}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          سازنده کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_manufacturer}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          مدل کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_model}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          مقدار کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_memory}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          اندازه صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.size_screen}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          نوع صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.type_screen}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          توضیحات صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.description_screen}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          آپشن های صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.option_screen}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">وبکم:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.webcam}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">درایو:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.drive}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          روشنایی صفحه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.lighting}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          {" "}
                          پورت ها:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.ports}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          پورت های usb2:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb2}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          پورت های usb3:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb3}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          تعداد پورت ها:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb_count}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          سیستم عامل:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.os}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          ظرفیت باطری:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.battery}
                        </span>
                      </p>

                      <p dir="rtl" className="flex flex-row gap-2">
                        <span className="font-VazirBlack text-sm">
                          محصولات داخل جعبه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.boxes}
                        </span>
                      </p>
                    </div>
                  ) : null}

                  {item?.type === "mobile" ? (
                    <div dir="rtl" className="flex flex-col p-2  gap-5 w-full">
                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">مدل:</span>
                        <span className="font-VazirBold text-md ">
                          {item?.deviceDetails?.mobile?.model &&
                            (item?.deviceDetails?.mobile?.model).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          زمان معرفی محصول:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.time_intruduction &&
                            (item?.deviceDetails?.mobile?.time_intruduction).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          سیستم عامل:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.resulation_camera &&
                            (item?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          وزن محصول:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.weight &&
                            (item?.deviceDetails?.mobile?.weight).toLocaleString(
                              "fa-IR"
                            )}{" "}
                          گرم
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          رزولوشن دوربین:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.mobile?.resulation_camera &&
                            (item?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                              "fa-IR"
                            )}
                          <span className="font-VazirLight text-xs">
                            پیکسل{" "}
                          </span>
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          دوربین های پشت گوشی:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.mobile?.camera_front &&
                            (item?.deviceDetails?.mobile?.camera_front).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          خروجی صدا:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.mobile?.sound_output}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          تکنولوژی صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.teqnology_screen}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          اندازه صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.size_screen &&
                            (item?.deviceDetails?.mobile?.size_screen).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          توضیحات بدنه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.disc_body}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          تعداد سیمکارت:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.sim_count &&
                            (item?.deviceDetails?.mobile?.sim_count).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">چیپ:</span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.chip}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          فرکانس پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.cpu_frequency}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          حافظه داخلی:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.internal_memory &&
                            (item?.deviceDetails?.mobile?.internal_memory).toLocaleString(
                              "fa-IR"
                            )}
                          <span className="font-VazirLight text-xs">
                            گیگابایت{" "}
                          </span>
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          مقدار RAM:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.ram_amount &&
                            (item?.deviceDetails?.mobile?.ram_amount).toLocaleString(
                              "fa-IR"
                            )}{" "}
                          <span className="font-VazirLight text-xs">
                            گیگابایت
                          </span>
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          {" "}
                          پشتیبانی از حافظه خارجی:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.support_ram
                            ? "دارد"
                            : "ندارد"}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          شبکه های مخابراتی:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {
                            item?.deviceDetails?.mobile
                              ?.telecommunicationـnetworks
                          }{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          شبکه های ارتباطی پشتیبانی شده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {
                            item?.deviceDetails?.mobile
                              ?.supportedـcommunicationـnetworks
                          }{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          ظرفیت باطری:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.battery_amount &&
                            (item?.deviceDetails?.mobile?.battery_amount).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          قابلیت های شارژ:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.option_charging}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          توضیحات باطری:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.desc_battery}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          قابلیت nfc:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.nfc
                            ? "دارد"
                            : "ندارد"}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          محصولات داخل جعبه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.boxes}{" "}
                        </span>
                      </div>

                      <hr className="my-1" />

                      <div
                        dir="rtl"
                        className="flex items-center flex-row gap-2"
                      >
                        <span className="font-VazirLight text-sm">
                          توضیحات تکمیلی:
                        </span>
                        <span className="font-VazirBold text-md">
                          {" "}
                          {item?.deviceDetails?.mobile?.more_info}{" "}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {item?.type === "laptop" ? (
                    <div dir="rtl" className="flex flex-col gap-5 w-full">
                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">وزن:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.weight &&
                            (item?.deviceDetails?.laptop?.weight).toLocaleString(
                              "fa-IR"
                            )}
                          <span className="font-VazirLight text-xs">گرم</span>
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">ابعاد:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.dimensions}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          سازنده پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_manufacturer}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          نسل پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_generation}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          سری پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_series}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          مدل پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_model}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          محدوده سرعت پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_speed_range}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          فرکانس پردازنده:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.processor_frequency}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-centerflex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          cache حافظه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.cache_memory}
                        </span>
                      </p>
                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          RAM حافظه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.ram_memory}
                        </span>
                      </p>
                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          حافظه هارد دیسک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.hard_memory}
                        </span>
                      </p>
                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          نوع هارد دیسک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.hard_type}
                        </span>
                      </p>
                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          سازنده کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_manufacturer}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          مدل کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_model}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          مقدار کارت گرافیک:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.graphics_memory}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          اندازه صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.size_screen}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          نوع صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.type_screen}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          توضیحات صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.description_screen}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          آپشن های صفحه نمایش:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.option_screen}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">وبکم:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.webcam}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">درایو:</span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.drive}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          روشنایی صفحه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.lighting}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          {" "}
                          پورت ها:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.ports &&
                            (item?.deviceDetails?.laptop?.ports).toLocaleString(
                              "fa-IR"
                            )}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          پورت های usb2:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb2 &&
                            (item?.deviceDetails?.laptop?.usb2).toLocaleString(
                              "fa-IR"
                            )}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          پورت های usb3:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb3 &&
                            (item?.deviceDetails?.laptop?.usb3).toLocaleString(
                              "fa-IR"
                            )}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          تعداد پورت ها:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.usb_count &&
                            (item?.deviceDetails?.laptop?.usb_count).toLocaleString(
                              "fa-IR"
                            )}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          سیستم عامل:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.os}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          ظرفیت باطری:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.battery}
                        </span>
                      </p>

                      <hr className="my-1" />

                      <p dir="rtl" className="flex items-center flex-row gap-2">
                        <span className="font-VazirLight text-sm">
                          محصولات داخل جعبه:
                        </span>
                        <span className="font-VazirBold text-md">
                          {item?.deviceDetails?.laptop?.boxes}
                        </span>
                      </p>
                    </div>
                  ) : null}

                  <hr className="w-[98%] mx-auto" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Compare;
