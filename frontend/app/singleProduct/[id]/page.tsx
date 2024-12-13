"use client";
import "swiper/css";
import "swiper/css/navigation";
// import { useCart } from "@/components/Context/CartContext";
// import { useWish } from "@/components/Context/WishContext";
import BreadCrumb from "@/components/templates/BreadCrumb";
import Color from "@/components/templates/Color";
import Meta from "@/components/templates/Meta";
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  ShopOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import FeaturedCollection from "@/components/FeaturedCollection/Featured-Collection";
import { useUser } from "@/context/UserContext";
import { useProduct } from "@/context/ProductContext";
import useSWR from "swr";
import { baseUrl } from "@/utils/baseUrl";

interface SingleProductProps {
  params: {
    id: string;
  };
}

const singleProduct = ({ params }: SingleProductProps) => {
  const { id } = params;
  const [color, setColor] = useState<any>(null);
  const [star, setStar] = useState<any>();
  const [comment, setComment] = useState<string | null>(null);
  const [comments, setComments] = useState<[] | null>([]);
 
  const { user: userData, AddtoCart, isInCart }: any = useUser();
  const {  AddtoWish, isInWishlist }: any = useProduct();


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/productComment`, {
          method: "GET",
        });
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log("error");
      }
    };

    getProducts()
  },[comment , comments]);


  const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json());
  const {data:productState , isLoading , error} = useSWR(`${baseUrl}/product/${id}`, fetcher)
 
if (isLoading) {
  return <div>لود شدن...</div>;
}
if (error) {
  return <div>خطایی رخ داده است</div>;
}

  const copyToClipboard = (text: string) => {
    // استفاده از navigator.clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("آدرس محصول با موفقیت کپی شد", text);
        toast.success("آدرس محصول با موفقیت کپی شد");
      })
      .catch((err) => {
        console.error("خطا در کپی کردن آدرس محصول", err);
        toast.error("خطا در کپی کردن آدرس محصول");
      });
  };

  const createProductComment = async () => {
    if (!userData) {
      toast.error("لطفا ابتدا وارد شوید");
    }
    try {
      // بررسی وجود امتیاز و کامنت
      if (star === null || comment === null) {
        toast.warning("لطفاً امتیاز و کامنت را وارد کنید");
        // return;
      }

      const res = await fetch(
        `${baseUrl}/productComment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            rating: star, // امتیاز
            body: comment, // متن کامنت
            product: productState?._id,
            user: userData?._id,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("نظر شما با موفقیت ثبت شد");
        setComment(null);
        setStar(null);
      }

      if (res.status === 400 || res.status === 404 || res.status === 422) {
        throw new Error("خطا در ایجاد کامنت");
      }

      const data = await res.json();
      console.log("کامنت با موفقیت ایجاد شد:", data);
    } catch (error) {
      console.error("خطا:", error);
    }
  };

  
  const commentLength =
    comments && comments.filter((item: any) => item.product === id).length;

  const productColors = productState?.color;
  return (
    <div className="w-full md:w-[98%] mx-auto p-2 font-VazirMedium">
      <Meta title={productState?.title} />
      {/* <BreadCrumb title={productState?.title} /> */}

      <div className="">
        <div className="flex flex-col gap-4  md:flex-row-reverse">
          <div className="w-full shadow-sm gap-2 p-2 bg-gray-50 rounded-md md:w-1/2 md:h-[85vh] lg:h-[100vh] xl:h-full">
            <img
              src={productState?.images[0]?.url}
              className="img-fluid mb-6 rounded-md"
              alt=""
            />

            <Swiper
              spaceBetween={15}
              dir="rtl"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
              breakpoints={{
                340: { slidesPerView: 2 },
              }}
            >
              {productState?.images.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <img
                      src={item?.url}
                      className="img-fluid rounded-md"
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div dir="rtl" className="w-full  p-1 rounded-md md:w-1/2 bg-white">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 py-2 rounded-md">
                <span className="text-slate-800 font-VazirBold text-lg">
                  {productState?.title}
                </span>
              </div>

              <hr />

              <div className="flex flex-col gap-2 py-2">
                <p className="flex flex-row gap-1 items-center">
                  <span className="font-VazirLight">قیمت محصول :</span>{" "}
                  <strong className="text-slate-800 font-VazirBold text-lg">
                    {productState?.price.toLocaleString("fa-IR")}
                  </strong>
                  <span className="text-slate-800 font-VazirLight text-sm">
                    تومان
                  </span>
                </p>

                <div className="flex  flex-row gap-2 items-center ">
                  <p className="mb-0 t-review">
                    ( {commentLength?.toLocaleString("fa-IR")} نظر )
                  </p>
                  <ReactStars
                    count={5}
                    color1="#ffd700"
                    size={24}
                    value={productState?.totalrating.toString()}
                    edit={false}
                  />
                </div>
                <a
                  className="font-VazirLight flex flex-row gap-1 text-sm"
                  href="#review"
                >
                  <CommentOutlined />
                  ثبت نظر جدید
                </a>
              </div>

              <article className="w-full mx-auto grid justify-center ps-2 bg-gray-50 rounded-md grid-cols-1 lg:grid-cols-2   gap-1">
                <div className="div-single">
                  <span className="single-span">نوع :</span>
                  <p className="single-p">{productState?.category}</p>
                </div>
                <div className="div-single">
                  <span className="single-span">برند :</span>
                  <p className="single-p">{productState?.brand}</p>
                </div>
                <div className="div-single">
                  <span className="single-span">دسته بندی :</span>
                  <p className="single-p">{productState?.category}</p>
                </div>

                {productState?.type === "mobile" ? (
                  <>
                    <div className="div-single">
                      <span className="single-span">سیستم عامل :</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile?.os}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">اندازه صفحه نمایش:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile?.size_screen}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">حافظه داخلی :</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile?.internal_memory}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span"> مقدار RAM :</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile?.ram_amount}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">دوربین اصلی:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile
                          ?.resulation_camera &&
                          (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                            "fa-IR"
                          )}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">تعداد سیمکارت:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.mobile?.sim_count &&
                          (productState?.deviceDetails?.mobile?.sim_count).toLocaleString(
                            "fa-IR"
                          )}
                      </p>
                    </div>
                  </>
                ) : null}

                {productState?.type === "laptop" ? (
                  <>
                    <div className="div-single">
                      <span className="single-span">مقدار RAM:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.laptop?.ram_memory &&
                          (productState?.deviceDetails?.laptop?.ram_memory).toLocaleString(
                            "fa-IR"
                          )}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">اندازه صفحه نمایش:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.laptop?.size_screen &&
                          (productState?.deviceDetails?.laptop?.size_screen).toLocaleString(
                            "fa-IR"
                          )}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">وزن:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.laptop?.weight &&
                          (productState?.deviceDetails?.laptop?.weight).toLocaleString(
                            "fa-IR"
                          )}
                      </p>
                    </div>

                    <div className="div-single">
                      <span className="single-span">سیستم عامل:</span>
                      <p className="single-p">
                        {productState?.deviceDetails?.laptop?.os}
                      </p>
                    </div>
                  </>
                ) : null}

                <div className="div-single">
                  <span className="single-span">تگ ها :</span>
                  <p className="single-p">
                    {productState?.tags === "featured"
                      ? "پیشنهادی"
                      : productState?.tags === "popular"
                      ? "محبوب"
                      : productState?.tags === "special"
                      ? "ویژه"
                      : "نامشخص"}
                  </p>
                </div>
                <div className="div-single">
                  <span className="single-span">موجودی :</span>
                  <p className="single-p text-green-600">موجود در انبار</p>
                </div>
              </article>

              <div className="flex flex-row gap-2   px-4 py-2 ">
                <span className="product-heading">رنگ :</span>

                {/* <Color setColor={setColor} colorData={productColors} /> */}
                <ul className="colors ps-0">
                  {productColors &&
                    productColors?.map((item: any, index: any) => {
                      console.log("item =>", item);
                      return (
                        <li
                          onClick={() => setColor(item?._id)}
                          style={{ backgroundColor: item?.title }}
                          key={index}
                        ></li>
                      );
                    })}
                </ul>
              </div>

              <div className="flex flex-row gap-2 items-center px-4">
                {isInCart(productState?._id) ? (
                  <Link
                    href="/cart"
                    className="text-sm items-center py-3 flex bg-yellow-600 text-white px-2 rounded-md"
                  >
                    <ShopOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginLeft: "6px",
                      }}
                    />
                    <span>برو به سبد خرید</span>{" "}
                  </Link>
                ) : (
                  <div
                    className="bg-red-700 flex flex-row cursor-pointer items-center text-sm text-white py-3 px-4 rounded-lg"
                    onClick={() => AddtoCart(productState)}
                  >
                    <ShopOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginLeft: "6px",
                      }}
                    />
                    <span>افزودن به سبد</span>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-2 items-center p-4">
                {isInWishlist(productState?._id) ? (
                  <div className="flex flex-row items-center gap-1">
                    <HeartFilled
                      style={{
                        color: "red",
                        fontSize: "25px",
                      }}
                      onClick={() => AddtoWish(productState)}
                    />
                    <span dir="rtl" className="text-sm">
                      به علاقه مندی ها افزوده شده است.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-1">
                    <HeartOutlined
                      style={{
                        color: "black",
                        fontSize: "25px",
                      }}
                      onClick={() => AddtoWish(productState)}
                    />
                    <span className="text-sm">افزودن به علاقه مندی</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 px-4">
                <div className="flex flex-row gap-1 items-center">
                  <TruckOutlined style={{ fontSize: "20px" }} />
                  <p className="text-sm font-VazirLight"> ارسال سایت :</p>
                </div>

                <p className="font-VazirBold text-sm text-slate-950">
                  این کالا در انبار سایت موجود و آماده پردازش است و توسط پیک
                  سایت در بازه انتخابی ارسال خواهد شد.قابلیت مرجوعی کالا در تمام
                  سفارشات موجود است!
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center p-4">
                <h3 className="text-sm font-VazirLight">لینک محصول:</h3>
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                >
                  <span className="text-sm font-VazirBold">کپی لینک محصول</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full bg-white p-4  rounded-lg my-4 flex flex-col justify-center">
        <Tabs dir="rtl" className="font-VazirMedium" defaultActiveKey="1">
          <TabPane
            className="font-VazirMedium"
            style={{ backgroundColor: "red" }}
            tab="توضیحات"
            key="1"
          >
            <div dir="rtl">
              <div className="bg-white p-3">
                <p
                  className="text-md font-VazirMedium"
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </TabPane>
          <div className="w-full h-2"></div>
          <TabPane className="font-VazirMedium" tab="مشخصات محصول" key="2">
            {productState?.type === "mobile" ? (
              <div dir="rtl" className="flex flex-col  gap-5 w-full">
                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">مدل:</span>
                  <span className="font-VazirBold text-md ">
                    {productState?.deviceDetails?.mobile?.model &&
                      (productState?.deviceDetails?.mobile?.model).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    زمان معرفی محصول:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.time_intruduction &&
                      (productState?.deviceDetails?.mobile?.time_intruduction).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">سیستم عامل:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.resulation_camera &&
                      (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">وزن محصول:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.weight &&
                      (productState?.deviceDetails?.mobile?.weight).toLocaleString(
                        "fa-IR"
                      )}{" "}
                    گرم
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    رزولوشن دوربین:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.mobile?.resulation_camera &&
                      (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">پیکسل </span>
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    دوربین های پشت گوشی:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.mobile?.camera_front &&
                      (productState?.deviceDetails?.mobile?.camera_front).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">خروجی صدا:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.mobile?.sound_output}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    تکنولوژی صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.teqnology_screen}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    اندازه صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.size_screen &&
                      (productState?.deviceDetails?.mobile?.size_screen).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">توضیحات بدنه:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.disc_body}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    تعداد سیمکارت:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.sim_count &&
                      (productState?.deviceDetails?.mobile?.sim_count).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">چیپ:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.chip}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    فرکانس پردازنده:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.cpu_frequency}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">حافظه داخلی:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.internal_memory &&
                      (productState?.deviceDetails?.mobile?.internal_memory).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">گیگابایت </span>
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">مقدار RAM:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.ram_amount &&
                      (productState?.deviceDetails?.mobile?.ram_amount).toLocaleString(
                        "fa-IR"
                      )}{" "}
                    <span className="font-VazirLight text-xs">گیگابایت</span>
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    {" "}
                    پشتیبانی از حافظه خارجی:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.support_ram
                      ? "دارد"
                      : "ندارد"}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    شبکه های مخابراتی:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {
                      productState?.deviceDetails?.mobile
                        ?.telecommunicationـnetworks
                    }{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    شبکه های ارتباطی پشتیبانی شده:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {
                      productState?.deviceDetails?.mobile
                        ?.supportedـcommunicationـnetworks
                    }{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">ظرفیت باطری:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.battery_amount &&
                      (productState?.deviceDetails?.mobile?.battery_amount).toLocaleString(
                        "fa-IR"
                      )}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    قابلیت های شارژ:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.option_charging}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    توضیحات باطری:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.desc_battery}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">قابلیت nfc:</span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.nfc
                      ? "دارد"
                      : "ندارد"}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    محصولات داخل جعبه:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.boxes}{" "}
                  </span>
                </div>

                <hr className="my-1" />

                <div dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    توضیحات تکمیلی:
                  </span>
                  <span className="font-VazirBold text-md">
                    {" "}
                    {productState?.deviceDetails?.mobile?.more_info}{" "}
                  </span>
                </div>

                <hr className="my-1" />
              </div>
            ) : null}

            {productState?.type === "laptop" ? (
              <div dir="rtl" className="flex flex-col gap-5 w-full">
                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">وزن:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.weight &&
                      (productState?.deviceDetails?.laptop?.weight).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">گرم</span>
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">ابعاد:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.dimensions}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    سازنده پردازنده:
                  </span>
                  <span className="font-VazirBold text-md">
                    {
                      productState?.deviceDetails?.laptop
                        ?.processor_manufacturer
                    }
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">نسل پردازنده:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.processor_generation}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">سری پردازنده:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.processor_series}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">مدل پردازنده:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.processor_model}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    محدوده سرعت پردازنده:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.processor_speed_range}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    فرکانس پردازنده:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.processor_frequency}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-centerflex-row gap-2">
                  <span className="font-VazirLight text-sm">cache حافظه:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.cache_memory}
                  </span>
                </p>
                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">RAM حافظه:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.ram_memory}
                  </span>
                </p>
                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    حافظه هارد دیسک:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.hard_memory}
                  </span>
                </p>
                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    نوع هارد دیسک:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.hard_type}
                  </span>
                </p>
                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    سازنده کارت گرافیک:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.graphics_manufacturer}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    مدل کارت گرافیک:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.graphics_model}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    مقدار کارت گرافیک:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.graphics_memory}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    اندازه صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.size_screen}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    نوع صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.type_screen}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    توضیحات صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.description_screen}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    آپشن های صفحه نمایش:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.option_screen}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">وبکم:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.webcam}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">درایو:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.drive}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">روشنایی صفحه:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.lighting}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm"> پورت ها:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.ports &&
                      (productState?.deviceDetails?.laptop?.ports).toLocaleString(
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
                    {productState?.deviceDetails?.laptop?.usb2 &&
                      (productState?.deviceDetails?.laptop?.usb2).toLocaleString(
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
                    {productState?.deviceDetails?.laptop?.usb3 &&
                      (productState?.deviceDetails?.laptop?.usb3).toLocaleString(
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
                    {productState?.deviceDetails?.laptop?.usb_count &&
                      (productState?.deviceDetails?.laptop?.usb_count).toLocaleString(
                        "fa-IR"
                      )}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">سیستم عامل:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.os}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">ظرفیت باطری:</span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.battery}
                  </span>
                </p>

                <hr className="my-1" />

                <p dir="rtl" className="flex items-center flex-row gap-2">
                  <span className="font-VazirLight text-sm">
                    محصولات داخل جعبه:
                  </span>
                  <span className="font-VazirBold text-md">
                    {productState?.deviceDetails?.laptop?.boxes}
                  </span>
                </p>
                <hr className="my-1" />
              </div>
            ) : null}
          </TabPane>
        </Tabs>
      </section>

      <section className="">
        <div
          dir="rtl"
          className="w-full p-4 bg-white   rounded-lg my-4 flex flex-col justify-center"
        >
          <div
            dir="rtl"
            className="text-md items-center  font-VazirBold text-slate-700 "
            id="review"
          >
            <CommentOutlined />
            <span> نظرات مشتریان</span>
          </div>

          <div className="review-inner-wrapper">
            <div className="flex flex-col pb-2 w-full justify-end md:flex-row">
              <div className="w-full flex flex-row justify-end">
                <div className="flex flex-col mx-auto  items-center gap-4 md:flex-row md:mx-0">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating?.toString()}
                    edit={false}
                    color1="#ffd700"
                    // activeColor="#ffd700"
                  />
                  <p dir="rtl" className="mb-0">
                    بر اساس {commentLength?.toLocaleString("fa-IR")} نظرات
                    مشتریان
                  </p>
                </div>
              </div>
            </div>
            <hr />

            <div dir="rtl" className="flex flex-col pt-4 gap-2">
              <div
                dir="rtl"
                className="text-md items-center   font-VazirBold text-slate-700 "
              >
                <CommentOutlined />
                <span dir="rtl" className="px-1">
                  می توانید نظر خود را ثبت کنید.
                </span>
              </div>
              <div dir="ltr" className="flex w-full justify-end">
                <ReactStars
                  count={5}
                  size={24}
                  value={star}
                  edit={true}
                  color2="#ffd700"
                  color1="gray"
                  // activeColor="#ffd700"
                  className="flex justify-end  w-full"
                  onChange={(e) => {
                    setStar(e);
                  }}
                />
              </div>

              <div>
                <textarea
                  name=""
                  id=""
                  className="w-full border  rounded-lg p-4 border-slate-950"
                  placeholder="لطفا نظر خود را بنویسید..."
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="flex content-end mb-4">
                <button
                  onClick={createProductComment}
                  className="bg-slate-950 text-white px-4 py-2 rounded-md"
                  type="button"
                >
                  ثبت نظر
                </button>
              </div>
            </div>
            <hr />

            <div className="flex flex-col-reverse mt-4">
              {comments &&
                comments
                  .filter((item: any) => item.product === id)
                  .map((item: any, index: number) => {
                    return (
                      <div className="py-2 items-center" key={index}>
                        <div className="flex gap-1 justify-between items-center">
                          <div className="flex flex-row gap-1 items-center">
                            <UserOutlined style={{ fontSize: "20px" }} />
                            <span className="mb-0 text-sm font-VazirLight text-slate-800">
                              {item?.user?.email}
                            </span>
                          </div>
                          <span className="mb-0 text-sm font-VazirLight text-slate-800">
                            {new Date(item.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                          </span>
                        </div>
                        <div className="flex w-full flex-col flex-wrap  gap-1 justify-between items-center md:flex-row">
                          <div
                            dir="rtl"
                            className="  w-full  flex mt-3 justify-start text-start text-md font-VazirMedium md:w-auto"
                          >
                            {item?.body}
                          </div>

                          <div dir="ltr" className="flex flex-row w-auto ">
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.rating}
                              edit={false}
                              color2="#ffd700"
                              color1="gray"
                            />
                          </div>
                        </div>
                        <hr className="my-2" />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>

      {/* <FeaturedCollection /> */}
    </div>
  );
};

export default singleProduct;
