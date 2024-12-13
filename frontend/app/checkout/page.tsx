"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import BreadCrumb from "@/components/templates/BreadCrumb";
import Meta from "@/components/templates/Meta";
import CustomInput from "@/components/templates/CustomInput";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { baseUrl } from "@/utils/baseUrl";

interface ShippingInfo {
  firstname: string;
  lastname: string;
  address: string;
  mobile: string;
  city: string;
  // country: string;
  pincode: string;
  // other?: string;
}

let shippingSchema = yup.object({
  firstname: yup.string().required("نام اجباری است"),
  lastname: yup.string().required("نام خانوادگی اجباری است"),
  city: yup.string().required("شهر محل سکونت اجباری است"),
  mobile: yup.string().required(" شماره تماس اجباری است"),
  address: yup.string().required("نشانی محل سکونت محل اجباری است"),
  pincode: yup.string().required("آدرس پستی اجباری است"),
});

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart }: any = useUser();
  const dispatch = useDispatch();
  const [cartProductState, setCartProductState] = useState<any[]>([]);
  const [authState, setAuthState] = useState<any>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);



  const [paymentInfo, setPaymentInfo] = useState<{
    razorpayPaymentId: string;
    razorpayOrderId: string;
  }>({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const navigate = useRouter();

  const totalAmount = cart?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items: any[] = [];
    for (let index = 0; index < cart?.length; index++) {
      items.push({
        product: cart[index]?._id,
        quantity: cart[index]?.quantity,
        color: cart[index]?.color[0],
        price: cart[index]?.price,
      });
    }
    setCartProductState(items);
  }, [cart]);

    const checkOutHandler = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      if (!res) {
        alert("Razorpay SDK failed to Load");
        return;
      }
      const tokenDetails = Cookies.get("jwt");
      const result: any = await axios.post(
        "http://localhost:5000/api/user/cart/create-order",
        { amount: totalAmount ? totalAmount + 100 : 0 },
        {
          headers: {
            authorization: `Bearer ${tokenDetails}`,
          },
        }
      );
  
      if (!result) {
        alert("Something Went Wrong");
        return;
      }
  
      const { amount, id: order_id, currency } = result.data.order;
  
      const options = {
        key: "rzp_test_HSSeDI22muUrLR", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Cart's corner",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };
  
          const result = await axios.post(
            `${baseUrl}/user/order/paymentVerification`,
            data,
            {
              headers: {
                authorization: `Bearer ${tokenDetails}`,
              },
            }
          );
  
          dispatch(
            authService.createOrder({
              totalPrice: totalAmount,
              totalPriceAfterDiscount: totalAmount,
              orderItems: cartProductState,
              paymentInfo: result.data,
              shippingInfo: JSON.parse(localStorage.getItem("address") as string),
            }) as any
          );
  
          localStorage.removeItem("address");
          // localStorage.removeItem("cart");
          // router.push("/");
          // dispatch(resetState());
        },
        prefill: {
          name: "Test User",
          email: "Test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "developer's corner office",
        },
        theme: {
          color: "#61dafb",
        },
      };
  
      // const paymentObject = new window.Razorpay(options);
      // paymentObject.open();
    };

 

  useEffect(() => {
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate.push("/cart");
    }
  }, [authState, navigate]);



    const formik = useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        address: "",
        mobile: "",
        city: "",
        pincode: "",
      },
      validationSchema: shippingSchema,
  
      onSubmit: async (values) => {
        try {
          setShippingInfo(values);
          localStorage.setItem("address", JSON.stringify(values));
          const orderDetail = {
            shippingInfo: values,
            orderItems: cartProductState,
            paymentInfo: paymentInfo,
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            user: authState?.user?._id,
          };
          await authService.createOrder({
            data: orderDetail,
          });

          toast.success("سفارش شما با موفقیت ثبت شد");
          localStorage.removeItem("address");
          localStorage.removeItem("cart");
          router.push("/");

    
          useEffect(() => {
            setTimeout(() => {
              checkOutHandler();
            }, 200);
          })

          
          
        } catch (error) {
          console.log("error during checkout", error);
        }
      },
    });

  
  return (
    <>
      <Meta title={"ثبت سفارش"} />
      <BreadCrumb title="ثبت سفارش" />
      <div className="w-[95%] py-4 mx-auto flex flex-col-reverse gap-3 justify-center md:flex-row">
        <section className="bg-white p-2 w-full flex-col gap-2 md:w-1/3">
          <div dir="rtl" className="flex flex-row  justify-between">
            <div className="flex  items-center  flex-row gap-3">
              <span style={{ fontSize: "20px", color: "green" }}>
                <PlusOutlined />
              </span>
              <span>قیمت محصولات:</span>
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
              <span style={{ fontSize: "20px", color: "green" }}>
                <PlusOutlined />
              </span>
              <span>هزینه ارسال:</span>
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
              <span className="text-lg font-VazirBold">مبلغ قابل پرداخت :</span>
            </div>

            <div className="flex flex-row gap-1 items-center">
              <span className="text-2xl font-VazirBold">
                {totalAmount?.toLocaleString("fa-IR")}
              </span>
              <span className="text-sm">تومان</span>{" "}
            </div>
          </div>

          <div className="flex w-full justify-center">
            <button
              onClick={() => formik.submitForm()}
              className="w-full py-2 font-VazirMedium text-center mt-4 bg-orange-600 text-white rounded-md"
            >
              ادامه و تایید سفارش
            </button>
          </div>
        </section>

        <section
          dir="rtl"
          className="bg-white p-2 w-full flex-col gap-2 md:w-2/3"
        >
          <p className="text-md font-VazirBold py-2">اطلاعات پرداخت</p>
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="w-full flex flex-col gap-3"
          >
            <div className="flex-grow-1">
              <CustomInput
                type="text"
                placeholder="لطفا نام خود را وارد کنید"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
              />
              <div className="formik-error ms-2 my-1">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>

            <div className="w-full">
              <CustomInput
                type="text"
                placeholder="لطفا نام خانوادگی خود را وارد کنید"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
              />
              <div className="formik-error ms-2 my-1">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>

            <div className="w-full">
              <CustomInput
                type="text"
                placeholder="لطفا شهر محل سکونت خود را وارد کنید"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange("city")}
                onBlur={formik.handleBlur("city")}
              />
              <div className="formik-error ms-2 my-1">
                {formik.touched.city && formik.errors.city}
              </div>
            </div>

            <div className="w-100">
              <CustomInput
                type="string"
                placeholder="لطفا شماره تماس خود را وارد کنید"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
              />
            </div>

            <div className="w-100">
              <CustomInput
                type="text"
                placeholder="لطفا آدرس محل سکونت خود را وارد کنید"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
              />
              <div className="formik-error ms-2 my-1">
                {formik.touched.address && formik.errors.address}
              </div>
            </div>

            <div className="flex-grow-1">
              <CustomInput
                type="text"
                placeholder="لطفا آدرس پستی محل سکونت خود را وارد کنید"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange("pincode")}
                onBlur={formik.handleBlur("pincode")}
              />
              <div className="formik-error ms-2 my-1">
                {formik.touched.pincode && formik.errors.pincode}
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Checkout;
