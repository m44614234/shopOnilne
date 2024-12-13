import React from "react";

const About = () => {

  const Array =[
  {
    title : "تنوع محصولات" ,
    desc:"گسترده‌ترین مجموعه محصولات دیجیتال"
  },
  {
    title : "قیمت مناسب" ,
    desc:"تضمین بهترین قیمت بازار"
  },
  {
    title : "کیفیت تضمینی" ,
    desc:"محصولات اصل و با گارانتی معتبر"
  },
  {
    title : "ارسال سریع" ,
    desc:"تحویل سریع سفارشات در سراسر کشور"
  },
  {
    title : "پشتیانی قوی" ,
    desc:"پاسخگویی به سوالات شما در هر زمان"
  },
  ]
  return (
    <div
      dir="rtl"
      className="flex w-[95%] mx-auto p-4 justify-center flex-col gap-4"
    >
      <p className="text-xl font-bold font-VazirBold">[نام فروشگاه]، دنیای دیجیتال شما</p>
      <p className="text-md font-VazirMedium">
        ما در [نام فروشگاه]، با هدف ارائه بهترین و جدیدترین محصولات دیجیتال به
        شما، فعالیت می‌کنیم. از گوشی‌های هوشمند گرفته تا لپ‌تاپ‌ها، هدفون‌های
        بی‌سیم و گجت‌های هوشمند، همه و همه را با بهترین قیمت و بالاترین کیفیت در
        اختیار شما قرار می‌دهیم.
      </p>

      <p className="text-md  font-VazirMedium">
      تیم حرفه‌ای ما همواره در تلاش است تا با ارائه خدمات پس از فروش قوی و پشتیبانی فنی، تجربه خریدی لذت‌بخش را برای شما رقم بزند.
      </p>

      
      <ul className="flex flex-col gap-3 font-VazirBold">
      <p className="text-lg text-slate-800 fon">چرا ما را انتخاب کنید؟</p>

        {
          Array.map((item , index) => {
            return (
              <li key={index} className="flex font-VazirMedium flex-row flex-wrap gap-2 items-center">
                <span className="text-red-600">✓</span>
                <p className="text-md font-bold text-black">{item.title}</p>:
                <p className="text-md text-slate-900">{item.desc}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default About;
