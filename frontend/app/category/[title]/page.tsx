"use client";
import ProductCard from "@/components/templates/ProductCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useProduct } from "@/context/ProductContext";
import { useBlog } from "@/context/BlogContext";

interface Product {
  brand: string;
  category: string;
  tags: string[];
  price: number;
}

const singleCategory = ({ params }: any) => {
  const router = useRouter();
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  //filter state
  const [tag, setTag] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const { products: productState } = useProduct();
  const { blog } = useBlog();


  useEffect(() => {
    let newBrands: any[] = [];
    let category: any[] = [];
    let newTags: any[] = [];

    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(...element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  const { title } = params;

  const decodedTitle = decodeURIComponent(title);


  

  useEffect(() => {

    // Check if the category is "لپتاپ" and redirect
    if (decodedTitle === "لپتاپ") {
      router.replace("/products/laptop"); // Replace with your desired URL
    } else if (decodedTitle === "تبلت و موبایل") {
      router.replace("/products/mobile"); // Replace with your desired URL
    }
  }, [decodedTitle]);

  const filteredProducts =
    productState &&
    productState?.filter((item: any) => item.category === decodedTitle);


  const blogImage =
    blog &&
    blog.map((item: any) => {
      return item.images[0];
    });

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-2 justify-center py-3">
      <div>
        <Swiper
          dir="rtl"
          spaceBetween={15}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            340: { slidesPerView: 1 },
          }}
        >
          {blog &&
            blogImage
              .slice(blogImage.length - 4, blogImage.length)
              .map((item : any, index : any) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="w-full mb-4 rounded-md  h-[350px]"
                  >
                    <Link href={`/blog/${item?.id}`}>
                      <Image
                        src={
                          item?.url
                            ? item?.url
                            : "https://picsum.photos/200/300"
                        }
                        priority={true}
                        width={1400}
                        height={300}
                        className="w-full bg-cover bg-center  h-[350px] rounded-md"
                        alt=""
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>

      <div dir="rtl" className="flex flex-col gap-4 md:flex-row">
        <section className="w-full  gap-4  rounded-md shadow-sm bg-gray-100  p-4  md:w-1/3 md:sticky md:top-36  md:sticky-top md:h-[140vh] lg:h-[120vh] lg:w-1/4">
          <div className="filter-card mb-3">
            <p className="text-md  font-VazirBold">خرید بر اساس دسته بندی ها</p>
            <div>
              <ul className="flex flex-col gap-3">
                <button
                  className="text-sm from-slate-950 text-right"
                  onClick={() => {
                    setCategory(null);
                  }}
                  style={{ color: "var(--color-777777)" }}
                >
                  همه
                </button>

                {categories &&
                  [...new Set(categories)].map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setCategory(item)}
                        className="text-sm cursor-pointer text-slate-900"
                      >
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <hr className="my-3" />
          </div>

          <div className="filter-card mb-3">
            <p className="text-md  font-VazirBold mb-2">فیلتر بر اساس قیمت</p>
            <div className="flex flex-col">
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col gap-1  items-center xl:flex-row">
                  <span className="text-sm font-VazirBlack  text-slate-900">
                    از قیمت{" "}
                  </span>
                  <input
                    type="number"
                    className="px-4 py-1 rounded-md border bg-gray-50"
                    id="floatingInput"
                    placeholder="1000"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMinPrice(Number(e.target.value))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1  items-center xl:flex-row">
                  <span className="text-sm font-VazirBlack text-slate-900">
                    تا قیمت{" "}
                  </span>
                  <input
                    type="number"
                    className="px-4 py-1 rounded-md border bg-gray-50"
                    id="floatingInput1"
                    placeholder="1000000"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMaxPrice(Number(e.target.value))
                    }
                  />
                </div>
              </div>
              <hr className="my-3" />
            </div>

            <div className="mt-4 mb-3">
              <h3 className="text-md font-bold font-VazirBold">
                فیلتر بر اساس نشان
              </h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <button
                    className="text-capitalize text-sm badge bg-light text-secondary rounded-3 py-2 px-3"
                    onClick={() => {
                      setBrand(null);
                    }}
                  >
                    همه
                  </button>
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => setBrand(item)}
                          className="text-capitalize cursor-pointer text-slate-900 text-sm badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full md:w-2/3 lg:w-3/4">
          <ProductCard data={filteredProducts ? filteredProducts : []} />
        </section>
      </div>
    </div>
  );
};

export default singleCategory;
