"use client";
import CustomInput from "@/components/CustomInput";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Forgotpassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e: any) => {
    e.preventDefault();

    try {
      const response: any = await axios.post(`${baseUrl}/auth/request-reset`, {
        email,
      });

      console.log("response =>", response);

      if (response.data) {
        alert("ایمیل بازنشانی رمز عبور با موفقیت ارسال شد");
        router.push("/");
        setEmail("");
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        alert("کاربری با این ایمیل وجود ندارد");
      }

      if (error.response.status === 500) {
        alert("مشکلی در سرور رخ داده است");
      }
    }
  };

  return (
    <div className="font-ShabnamMedium">
      <div
        dir="rtl"
        className="w-full grid grid-cols-1 justify-center md:grid-cols-2"
      >
        <section className="hidden w-full md:flex justify-center">
          <img src="/images/core.jpg" className="w-full h-full" alt="login" />
        </section>
        <section className="flex relative flex-col  justify-center w-full ">
          <div className="w-full mt-6 md:mt-0">
            <div className="auth-card">
              <p className="text-center mt-2 mb-3">
                برای بازنشانی رمز عبور ایمیلی برای شما ارسال می کنیم
              </p>
              <form
                action=""
                className="formik-form"
                onSubmit={handleResetPassword}
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="آدرس ایمیل خود را وارد کنید"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />

                <div>
                  <div className="my-1 flex flex-col justify-center flex-column gap-2 items-center">
                    <button
                      className="px-8  py-2 w-[95%] mx-auto  text-white bg-red-500   rounded-md "
                      type="submit"
                    >
                      ارسال ایمیل
                    </button>
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

export default Forgotpassword;
