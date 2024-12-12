"use client";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";

const Signup = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });


      if(res.status === 400){
        alert("لطفا مقادیر را وارد کنید.")
      }


      if(res.status === 422){
        alert("این ایمیل قبلا ثبت شده است.")
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else if (res.ok) {
        alert("ثبت نام با موفقیت انجام شد");
        router.push("/login");
        setUser({ username: "", email: "", password: "" });
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

 
  return (
    <>
      <div
        dir="rtl"
        className="w-full grid grid-cols-1 justify-center md:grid-cols-2"
      >
        <section className="hidden w-full md:flex justify-center">
          <img src="/images/core.jpg" className="w-full h-full" alt="login" />
        </section>

        <section className="flex relative flex-col justify-center w-full ">
          <p
            dir="rtl"
            className="text-md font-VazirLight px-3 pt-2 pb-7 mt-4 md:px-5"
          >
            برای ثبت‌نام در فروشگاه ما، لطفاً مراحل زیر را دنبال کنید:
          </p>

          <div className="w-full lg:mt-0">
            <div className="flex-col justify-center gap-2">
              <form className="formik-form" onSubmit={handleRegister}>
                <CustomInput
                  type="text"
                  name="username"
                  placeholder="لطفا نام کاربری خود را وارد کنید"
                  value={user.username}
                  onChange={handleChange}
                />

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

                <div>
                  <div className="mt-1 flex justify-center gap-2 items-center">
                    <button
                      type="submit"
                      className="px-8 py-2 w-[95%] mx-auto text-white bg-red-500 rounded-md"
                    >
                      ثبت نام
                    </button>
                  </div>

                  <div className="w-[95%] mx-auto gap-4 items-center my-12 flex justify-between flex-col md:flex-row">
                    <div className="font-VazirLight">
                      آیا از قبل حساب کاربری دارید؟
                      <Link
                        href="/login"
                        className="px-1 text-red-600 font-VazirBold"
                      >
                        وارد شوید
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
