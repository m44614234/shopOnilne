import Link from "next/link";

const TopBanner = () => {
  return (
    <div
      className={` flex w-full p-3 rounded-md  flex-col-reverse  md:flex-row`}
    >
      <div
        dir="rtl"
        className="w-full my-auto h-full flex flex-col justify-center gap-5  rounded-l-md md:w-1/2"
      >
        <p
          className={`text-2xl font-bold font-VazirLight text-start text-slate-800 items-center`}
        >
          دنیای الکترونیک در دستان شما!
        </p>
        <p
          className={`text-md font-bold font-VazirLight text-start text-slate-800 items-center`}
        >
          بهترین و جدیدترین لوازم الکترونیکی را با قیمت‌های استثنایی پیدا کنید.
          از گوشی‌های هوشمند تا لوازم جانبی، همه چیز در فروشگاه ما منتظر شماست.
          خریدی آسان و مطمئن، تجربه‌ای بی‌نظیر!
        </p>

        <Link
          href="/ourStore"
          className={`bg-fuchsia-600  w-44  px-6 py-2 rounded-md text-white text-md font-VazirBlack`}
        >
          مشاهده محصولات
        </Link>
      </div>
      <div className="w-full rounded-r-md md:w-1/2">
        <img
          src={"/images/main.jpg"}
          className="w-full h-full mx-auto  object-cover rounded-r-md "
          alt="login"
        />
      </div>
    </div>
  );
};
export default TopBanner;
