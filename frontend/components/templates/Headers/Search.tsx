"use client";
import {
  CloseOutlined,
  DeleteFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useSelector } from "react-redux";
import { baseUrl } from "@/utils/baseUrl";
import { useProduct } from "@/context/ProductContext";

const Search = () => {
  //   const searchParams = useSearchParams();
  //   const pathName = usePathname();
  //   const router = useRouter();
  //   const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  //   // Update search value state on input change
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchValue(e.target.value);
  //   };

  //   // Debounce function to delay the search query update
  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       const params = new URLSearchParams(searchParams.toString());
  //       if (searchValue) {
  //         params.set("search", searchValue);
  //       } else {
  //         params.delete("search");
  //       }
  //       router.push(`${pathName}?${params.toString()}`);
  //     }, 300); // Adjust the debounce delay as needed

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [searchValue, pathName, router, searchParams]);

  //   // Handle search on Enter key press
  //   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       const params = new URLSearchParams(searchParams.toString());
  //       if (searchValue) {
  //         params.set("search", searchValue);
  //       } else {
  //         params.delete("search");
  //       }
  //       router.push(`${pathName}?${params.toString()}`);
  //     }
  //   };
  


  const [query, setQuery] = useState("");
 
  const {products} = useProduct()
  console.log("products =>", products);
  // use SWR
  const fetcher = (...args: [string]) =>
    fetch(...args).then((res) => res.json());

  const { error, data } = useSWR(`${baseUrl}/product`, fetcher);

  const handleSearch = (event: FormEvent<HTMLElement>) => {
    setQuery((event.target as HTMLInputElement).value);
  };

  const fuse = useMemo(() => {
    if (!data) return null;
    return new Fuse(data, {
      includeScore: true,
      keys: ["title"],
    });
  }, [data]);

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
