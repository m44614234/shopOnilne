"use client";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useProduct } from "@/context/ProductContext";

const Search = () => {
  const [query, setQuery] = useState("");

  const { products } = useProduct();

  const handleSearch = (event: FormEvent<HTMLElement>) => {
    setQuery((event.target as HTMLInputElement).value);
  };

  const fuse = useMemo(() => {
    if (!products) return null;
    return new Fuse(products, {
      includeScore: true,
      keys: ["title"],
    });
  }, [products]);

  const searchResults = useMemo(() => {
    if (!fuse || !query) return [];
    return fuse.search(query);
  }, [fuse, query]);

  return (
    <div className="hidden relative  md:flex flex-col gap-1 items-center bg-gray-100 px-2 py-1 rounded-md">
      <div className="flex flex-row items-center">
        <SearchOutlined className="text-xl p-2 cursor-pointer" />
        <Input
          placeholder="لطفا کلمه کلیدی را وارد کنید"
          value={query}
          onChange={handleSearch}
          className="w-96  p-1 bg-gray-100 border-none rounded-md outline-none focus:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-0"
        />
        {query.length ? (
          <CloseOutlined
            className="text-lg p-2 cursor-pointer"
            style={{ color: "red" }}
            onClick={(e) => setQuery("")}
          />
        ) : null}
      </div>

      <div className=" flex absolute w-full top-12 flex-col">
        {searchResults &&
          searchResults.slice(0, 4).map((item: any) => (
            <div key={item.item._id} className=" flex  flex-col gap-2">
              <div className=" flex w-full py-3 px-2 rounded-md my-[1px] flex-row items-center  bg-gray-100">
                <span className="text-sky-900 w-[5%]">
                  <SearchOutlined style={{ fontSize: "13px" }} />
                </span>
                <Link
                  href={`/singleProduct/${item.item._id}`}
                  className="text-md font-VazirMedium w-[95%]"
                >
                  {item.item.title}
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
