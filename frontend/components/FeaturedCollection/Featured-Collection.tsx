import Titles from "../templates/Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import ProductSwiper from "../templates/ProductSwiper";
import useSWR from "swr";
import { useRef } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useProduct } from "@/context/ProductContext";

interface Props{
  categoryName : string ;
  title : string
}


const FeaturedCollection = ({categoryName,
  title}:Props) => {
  
    const {products : data} = useProduct()

  const swiperRef: any = useRef(null);
  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  return (
    <div>
      <div className="flex mt-6 flex-row-reverse justify-between w-full">
        <Titles title={title} />
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={handlePrev}
            className="bg-slate-800 w-10 h-10 text-center rounded-full text-white  prev-button"
          >
            <ArrowLeftOutlined
              style={{ color: "white", marginTop: "7px", fontSize: "20px" }}
            />
          </button>
          <button
            onClick={handleNext}
            className="bg-slate-800 w-10 h-10 text-center rounded-full text-white  next-button"
          >
            <ArrowRightOutlined
              style={{ color: "white", marginTop: "7px", fontSize: "20px" }}
            />
          </button>
        </div>
      </div>

      <div data-aos="fade-right">
        <Swiper
          ref={swiperRef}
          dir="rtl"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            400: { slidesPerView: 2 , spaceBetween:10},

            768: { slidesPerView: 3 , spaceBetween:10},
            1024: {
              slidesPerView: 4,
              spaceBetween:25
            },
          }}
        >
          {data &&
            data?.map((item: any, index: any) => {
              if (item.tags.includes(categoryName)) {
                return (
                  <SwiperSlide key={item._id}>
                    <div key={index} className=" w-full">
                      <ProductSwiper index={index} data={item} />
                    </div>
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedCollection;
