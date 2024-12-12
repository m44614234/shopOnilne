"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  EditFilled,
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@/context/UserContext";
import { logout } from "@/utils/logout";

let profileSchema = yup.object({
  firstname: yup.string().required("نام ضروری است"),
  lastname: yup.string().required("نام خانوادگی ضروری است"),
  mobile: yup.string().required("شماره تماس ضروری است"),
  email: yup.string().required("ایمیل ضروری است").email("ایمیل نامعتبر است"),
});

const Profile = () => {
  const [currentComponent, setCurrentComponent] = useState("orders");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);


  const router = useRouter();

  const {user} = useUser();
  console.log("user from context =>", user);
  // items

  const renderComponent = () => {
    switch (currentComponent) {
      case "orders":
        return <OrdersComponent />;
      case "settings":
        return <SettingsComponent />;
      default:
        return <OrdersComponent />;
    }
  };

  const getItemClass = (component: any) => {
    return currentComponent === component ? "active-item" : "inactive-item";
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await logout();
      if (result) {
        toast.success("خروج از حساب کاربری با موفقیت انجام شد");
        router.replace("/login");
      }
    } catch (err) {
      setError("خطا در اتصال به سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100  py-4">
      {/* <BreadCrumb title="پروفایل من" /> */}

      <div
        dir="rtl"
        className="w-[95%] mx-auto flex flex-col  gap-4 md:flex-row"
      >
        <section className="w-full  gap-6 shadow-sm border bg-white  p-4  md:w-1/3 md:sticky  md:sticky-top   lg:w-1/4">
          <div className="w-full flex flex-row items-center text-slate-800 gap-2">
            <UserOutlined style={{ fontSize: "25px" }} />
            <div className="font-VazirBold flex flex-row gap-1">
              <span>{userData?.firstname}</span>
              <span>{userData?.lastname}</span>
            </div>
          </div>
          <hr className="w-[96%] my-4 mx-auto" />

          <ul className="w-full flex flex-col gap-6">
            <div
              className={`flex  cursor-pointer flex-row gap-1 items-center ${getItemClass(
                "orders"
              )}`}
              onClick={() => setCurrentComponent("orders")}
            >
              <ShopOutlined style={{ fontSize: "20px" }} />
              <span className="text-sm ">سفارشات من</span>
            </div>
            <div
              className={`flex  cursor-pointer flex-row gap-1 items-center  ${getItemClass(
                "wishlist"
              )}`}
            >
              <HeartOutlined style={{ fontSize: "20px" }} />
              <Link href="/wishlist" className="text-sm ">
                {" "}
                علاقه مندی ها
              </Link>
            </div>
            <div
              className={`flex  cursor-pointer flex-row gap-1 items-center ${getItemClass(
                "cart"
              )}`}
            >
              <ShoppingOutlined style={{ fontSize: "20px" }} />
              <Link href="/cart" className="text-sm ">
                {" "}
                سبد خرید
              </Link>
            </div>
            <div
              className={`flex  cursor-pointer flex-row gap-1 items-center ${getItemClass(
                "settings"
              )}`}
              onClick={() => setCurrentComponent("settings")}
            >
              <SettingOutlined style={{ fontSize: "20px" }} />
              <span className="text-sm">تغییر اطلاعات کاربری</span>
            </div>
          </ul>
          <hr className="w-[96%] my-4 mx-auto" />

          <div
            onClick={handleLogout}
            className="flex flex-row gap-1 items-center hover:text-red-600"
          >
            <LogoutOutlined style={{ fontSize: "20px" }} />
            <Link href="/wishlist" className="text-md ">
              خروج
            </Link>
          </div>
        </section>

        <section className="w-full  gap-6 shadow-sm border bg-white  p-4  md:sticky  md:sticky-top md:w-2/3 lg:w-3/4">
          {renderComponent()}
        </section>
      </div>
    </div>
  );
};

export default Profile;

const OrdersComponent = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

 

  const fetcher = (...args: [string]) =>
    fetch(...args).then((res) => res.json());
  const { error, data } = useSWR("http://localhost:5000/api/order", fetcher);

  if (error) return toast.error("خطایی رخ داده است");
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <>
      {data?.length === 0 ? (
        <img src="/empty.jpg" alt="empty" className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex flex-col gap-1">
          <div className="w-full mx-auto text-center justify-center items-center text-sm font-VazirLight bg-slate-800 text-white p-2 h-14 grid grid-cols-4">
            <div className="w-full text-center">کد سفارش</div>
            <div className="w-full text-center">مبلغ کل</div>
            <div className="w-full text-center">تاریخ ثبت سفارش</div>
            <div className="w-full text-center">وضعیت</div>
          </div>

          {data
            .filter((order: any) => order.user === userData?._id)
            .map((order: any) => (
              <div className="w-full h-full flex flex-col items-center">
                <section
                  key={order?._id}
                  className="flex gap-2 flex-wrap h-full items-center my-auto flex-col w-full md:flex-row lg:flex-nowrap"
                >
                  <div className="w-full text-center text-md">{order?._id}</div>
                  <div className="w-full text-center">
                    {(order?.totalPrice).toLocaleString("fa-IR")}
                    <span className="text-xs mx-1">تومان</span>
                  </div>
                  <div className="w-full text-center text-sm">
                    {new Date(order?.createdAt).toLocaleDateString("fa-IR")}
                  </div>
                  <div className="w-full text-center">
                    {order?.orderStatus === "Ordered" ? (
                      <span className="text-red-600 text-xs">پرداخت نشده</span>
                    ) : (
                      <span className="text-green-600 text-xs">پرداخت شده</span>
                    )}
                  </div>
                </section>

                <hr className="w-[98%] mx-auto my-2" />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

const SettingsComponent = () => {
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  const [edit, setEdit] = useState(true);

  useEffect(() => {
    // const getProfileFunc = async () => {
    //   const profile: any = await authService.getProfile();
    //   setUserData(profile?.user);
    //   if (!profile?.user) {
    //     router.replace("/login");
    //   }
    //   formik.setValues({
    //     firstname: profile?.user?.firstname,
    //     lastname: profile?.user?.lastname,
    //     email: profile?.user?.email,
    //     mobile: profile?.user?.mobile,
    //   });
    // };
    // getProfileFunc();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        // const response = await authService.updateUser({ data: values });
        const response = "";
        console.log("response", response);
        toast.success("پروفایل با موفقیت بروزرسانی شد");
        setUserData(response); // به‌روزرسانی داده‌های کاربر
        setEdit(false); // بازگشت به حالت مشاهده
      } catch (error) {
        console.error("Error updating profile:", error);
      }

      setEdit(true);
    },
  });

  return (
    <div className="flex flex-col">
      <div dir="rtl" className="flex justify-start gap-2 items-center">
        <EditFilled
          style={{
            fontSize: "20px",
            color: "white",
            backgroundColor: "black",
            borderRadius: "100%",
            padding: "10px",
          }}
          onClick={() => setEdit(false)}
        />
        <p className="my-3 font-bold font-VazirBold">بروزرسانی پروفایل</p>
      </div>

      <div className="w-full font-VazirMedium">
        <form action="" onSubmit={formik.handleSubmit}>
          <div dir="rtl" className="flex flex-col gap-2">
            <div className="mb-3">
              <label htmlFor="firstname" className="text-sm">
                نام
              </label>
              <input
                type="text"
                name="firstname"
                className="w-full border bg-white shadow-sm rounded-lg px-4 py-3"
                id="firstname"
                disabled={edit}
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
              />
              <div className="formik-error">
                {formik.touched.firstname && (formik.errors.firstname as any)}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="text-sm">
                نام خانوادگی
              </label>
              <input
                type="text"
                name="lastname"
                className="w-full border bg-white shadow-sm rounded-lg px-4 py-3"
                id="lastname"
                disabled={edit}
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
              />
              <div className="formik-error">
                {formik.touched.lastname && (formik.errors.lastname as any)}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="text-sm">
                آدرس ایمیل
              </label>
              <input
                type="email"
                name="email"
                className="w-full border bg-white shadow-sm rounded-lg px-4 py-3"
                id="email"
                disabled={edit}
                aria-describedby="emailHelp"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <div className="formik-error">
                {formik.touched.email && (formik.errors.email as any)}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="text-sm">
                شماره تماس
              </label>
              <input
                type="string"
                name="mobile"
                className="w-full border bg-white shadow-sm rounded-lg px-4 py-3"
                id="mobile"
                disabled={edit}
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
              />
              <div className="formik-error">
                {formik.touched.mobile && (formik.errors.mobile as any)}
              </div>
            </div>
          </div>

          {edit === false && (
            <button
              type="submit"
              className="bg-slate-950 text-white px-6 w-full rounded-md mb-2 py-2"
            >
              ذخیره
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
