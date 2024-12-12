"use client";
import {
  GithubFilled,
  HomeOutlined,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { IconMap } from "antd/es/result";
import Link from "next/link";
import { title } from "process";

const Footer = () => {
  const boxs = [
    {
      id: 1,
      img: "/images/service.png",
      title: "امکان تحویل اکسپرس",
    },
    {
      id: 2,
      img: "/images/service-05.png",
      title: "امکان پرداخت در محل",
    },
    {
      id: 3,
      img: "/images/service-03.png",
      title: "7روز هفته - 24ساعته",
    },
    {
      id: 4,
      img: "/images/service-02.png",
      title: "هفت روز ضمانت بازگشت کالا",
    },
    {
      id: 5,
      img: "/images/service-04.png",
      title: "ضمانت اصل بودن کالا",
    },
  ];

  return (
    <div className="w-full flex  flex-col bg-white border-t shadow-xl">
      <footer className="w-[95%] flex flex-col mx-auto justify-center">
        <section className="w-full flex flex-row-reverse mt-3 justify-between">
          <div className="text-lg text-red-600">FaredStore</div>
          <button
            className="bg-white text-sm font-VazirMedium shadow-md text-slate-800 font-bold rounded-lg border px-6 py-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            برگشت به بالا
          </button>
        </section>

        <section
          dir="rtl"
          className="w-full text-md font-VazirMedium flex flex-col md:flex-row mt-3 gap-3 justify-start"
        >
          <div className="flex flex-row gap-2">
            <span>تلفن پشتیبانی</span>
            <span> ۶۱۹۳۰۰۰۰ - ۰۲۱ </span>
          </div>
          <div className="hidden md:flex">|</div>
          <div className="flex flex-row gap-2">
            <span> ۹۱۰۰۰۱۰۰ - ۰۲۱</span>
          </div>
          <div className="hidden md:flex">|</div>

          <div className="flex flex-row gap-2">
            <span> هفت روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
          </div>
        </section>

        <div
          dir="rtl"
          className="w-full gap-3 justify-center mt-6 grid grid-cols-2 md:grid-cols-5"
        >
          {boxs &&
            boxs.map((item) => (
              <div
                key={item.id}
                className="flex flex-col mx-auto text-center gap-2"
              >
                <img src={item.img} className="w-8 h-8 mx-auto " />
                <p dir="rtl" className="text-sm font-VazirLight">
                  {item.title}
                </p>
              </div>
            ))}
        </div>
      </footer>

      <hr className="my-6 w-[80%] mx-auto py-[2px]  justify-center " />

      <footer className=" flex  justify-center w-full">
        <div
          dir="rtl"
          className="gap-4 w-full mx-auto px-3 justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:w-[95%]"
        >
          <div className="w-full flex flex-col ">
            <p className="text-slate-900 text-xl font-VazirBold mb-4">
              تماس با ما
            </p>
            <div className="gap-2 flex flex-col">
              <address dir="rtl" className="text-slate-900 fs-6">
                <HomeOutlined style={{ fontSize: "16px", margin: "2px" }} />
                تهران ، خیابان قائم مقام فراهانی ، خیابان مگنولیا ، پلاک 30  ، واحد 12
              </address>
              <Link
                href="tel:+91 8264954234"
                className="mt-3 d-block mb-1 items-center text-slate-900"
              >
                <PhoneOutlined style={{ fontSize: "16px", margin: "2px" }} />
                021-88322389
              </Link>
              <Link
                href="mailto:devjariwala8444@gmail.com"
                className="mt-2 d-block mb-0  items-center text-slate-900"
              >
                <MailOutlined style={{ fontSize: "16px", margin: "2px" }} />
                MRHZS1376@gmail.com
              </Link>
              <div className="flex flex-row align-items-center gap-4 mt-4">
                <Link className="text-slate-900" href="/">
                  <LinkedinFilled style={{ fontSize: "30px" }} />
                </Link>
                <Link className="text-slate-900" href="/">
                  <InstagramFilled style={{ fontSize: "30px" }} />
                </Link>
                <Link className="text-slate-900" href="/">
                  <GithubFilled style={{ fontSize: "30px" }} />
                </Link>
                <Link className="text-slate-900" href="/">
                  <YoutubeFilled style={{ fontSize: "30px" }} />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-slate-900 text-xl font-VazirBold mb-4">
              اطلاعات
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/privacyPolicy"
                className="text-slate-900 py-2 mb-1"
              >
                شرایط و ضوابط
              </Link>
              <Link className="text-slate-900 py-2 mb-1" href="/blog">
                وبلاگ ها
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-slate-900 text-xl font-VazirBold mb-4">
              حساب کاربری
            </p>
            <div className="gap-2 flex flex-col">
              <Link href="/about" className="text-slate-900 py-2 mb-1">
                درباره ما
              </Link>

              <Link href="/contact" className="text-slate-900 py-2 mb-1">
                ارتباط با ما
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-slate-900 text-xl font-VazirBold mb-4">
              لینک های سریع
            </p>
            <div className="gap-2 flex flex-col">
              <Link href="/ourStore" className="text-slate-900 py-2 mb-1">
                لپتاپ
              </Link>
              <Link href="/ourStore" className="text-slate-900 py-2 mb-1">
                لوازم جانبی
              </Link>
              <Link href="/ourStore" className="text-slate-900 py-2 mb-1">
                تبلت و موبایل
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <hr className="my-6 w-[80%] mx-auto py-[2px]  justify-center " />

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-slate-900">
                &copy; {new Date().getFullYear()}; تمامی حقوق محفوظ است
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
