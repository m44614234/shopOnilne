"use client";
import Meta from "@/components/templates/Meta";
import ProductCard from "@/components/templates/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
interface Product {
  brand: string;
  category: string;
  tags: string[];
  price: number;
}

const OurStore: React.FC = () => {
  const router = useRouter();

  const [grid, setGrid] = useState<number>(4);
  const {products : productState } = useProduct()
  
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  //filter state
  const [tag, setTag] = useState<string | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string | null>(null);

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

  

  const sortByLowestPrice = () => {
    const sorted = [...productState].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const sortByHighestPrice = () => {
    const sorted = [...productState].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  useEffect(() => {
    setSortedProducts(productState);
  }, [productState]);

  // searchParams
  const searchParams = useSearchParams();

  // گرفتن پارامترها از URL
  const brandParam = searchParams.get("brand");
  const typeParam = searchParams.get("type");
  const priceParam = searchParams.get("price");
  const coreParam = searchParams.get("core");

  useEffect(() => {
    if (brandParam) {
      setBrand(brandParam);
    }
    if (typeParam) {
      setCategory(typeParam);
    }
    if (priceParam) {
      setMaxPrice(parseInt(priceParam));
    }
    if (coreParam) {
      setTag(coreParam);
    }
  }, [brandParam, typeParam, priceParam, coreParam]);

  return (
    <div dir="rtl" className="w-[95%] mx-auto py-4">
      <Meta title={"فروشگاه ما"} />

      <div className="flex flex-col gap-4 md:flex-row">
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
                  <span className="text-sm font-VazirBlack text-slate-900">
                    از قیمت{" "}
                  </span>
                  <input
                    type="number"
                    className="px-4 py-1 rounded-md border bg-slate-50"
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
                    className="px-4 py-1 rounded-md border bg-slate-50"
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

        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="filter-sort-grid mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <article className="flex items-center flex-col gap-3 lg:flex-row">
                <p className="mb-0 d-block" style={{ width: "100px" }}>
                  به ترتیب:
                </p>

                <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
                  <button
                    className="bg-slate-800 text-sm text-white p-2 rounded-md"
                    onClick={sortByLowestPrice}
                  >
                    ارزان ترین
                  </button>
                  <button
                    className="bg-slate-800 text-sm text-white p-2 rounded-md"
                    onClick={sortByHighestPrice}
                  >
                    گران ترین
                  </button>
                  <button
                    className="bg-slate-800 text-sm text-white p-2 rounded-md"
                    onClick={() => {}}
                  >
                    جدیدترین
                  </button>
                  <button
                    className="bg-slate-800 text-sm text-white p-2 rounded-md"
                    onClick={() => {}}
                  >
                    پربازدیدترین
                  </button>
                  <button
                    className="bg-slate-800 text-sm text-white p-2 rounded-md"
                    onClick={() => {}}
                  >
                    پیشنهاد خریداران
                  </button>
                </div>
              </article>
            </div>
          </div>
          <div>
            <ProductCard
              data={productState ? sortedProducts : []}
              grid={grid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
