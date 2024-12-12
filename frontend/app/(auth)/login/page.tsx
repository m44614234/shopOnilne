"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import CustomInput from "@/components/CustomInput";
import { baseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await axios.post(
        `${baseUrl}/auth/loginUser`,
        user
      );

      if (response.data) {
        console.log(response);
        const token = response.data.token; // فرض بر این است که توکن در داده‌های پاسخ قرار دارد
        Cookies.set("jwt", token, { expires: 7 }); // توکن برای 7 روز معتبر است
        alert("ورود با موفقیت انجام شد");
        router.push("/");
        setUser({ email: "", password: "" }); // پاک کردن مقادیر ورودی
      }
    } catch (error: any) {
      if (error.status === 400) {
        alert("لطفا مقادیر را وارد کنید.");
      }

      if (error.status === 404) {
        alert("کاربری با این مشخصات وجود ندارد.");
      }

      if (error.status === 422) {
        alert("ایمیل یا رمز عبور صحیح نمی باشد. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  return (
    <div
      dir="rtl"
      className="font-VazirBold  w-full flex flex-col justify-center"
    >
      <div
        dir="rtl"
        className="w-full grid grid-cols-1 justify-center md:grid-cols-2"
      >
        <section className="hidden w-full md:flex justify-center">
          <img src="/images/core.jpg" className="w-full h-full" alt="login" />
        </section>

        <section className="flex relative flex-col  justify-center w-full ">
          <div className="w-full mt-6 lg:mt-0">
            <div className=" flex-col justify-top gap-2">
              <p
                dir="rtl"
                className="text-xl font-VazirBold px-3 md:text-2xl md:px-5"
              >
                به فروشگاه اینترنتی ما خوش آمدید!{" "}
              </p>
              <p
                dir="rtl"
                className="text-md font-VazirLight px-3 pt-2 pb-7 md:px-5"
              >
                برای دسترسی به محصولات ویژه و تخفیف‌ها، لطفاً وارد حساب کاربری
                خود شوید. اگر هنوز حساب ندارید، همین حالا{" "}
                <Link href="/signup" className="text-red-500 font-VazirBold">
                  ثبت نام
                </Link>{" "}
                کنید!
              </p>
              <form action="" onSubmit={handleLogin} className="formik-form">
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="لطفا ایمیل خود را وارد کنید"
                  value={user.email}
                  onChange={handleChange}
                />

                <CustomInput
                  type="password"
                  name="password"
                  placeholder="لطفا رمز عبور خود را وارد کنید"
                  value={user.password}
                  onChange={handleChange}
                />

                <div className="w-full flex justify-center mt-2">
                  <button
                    className="px-8 py-2 w-[95%] mx-auto text-white bg-red-500 rounded-md"
                    type="submit"
                  >
                    ورود
                  </button>

                 
                </div>

                <div className="w-[95%] mx-auto gap-4 items-center my-12 flex justify-between flex-col md:flex-row">
                    <div className="font-VazirLight">
                      آیا هنوز حساب ندارید؟
                      <Link
                        href="/signup"
                        className="px-1 text-red-600 font-VazirBold"
                      >
                        ثبت نام کنید{" "}
                      </Link>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      {/* <EyeInvisibleOutlined className="text-2xl" /> */}
                      <Link href="/forgotpassword" className="font-VazirLight">
                        فراموشی رمز عبور
                      </Link>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
