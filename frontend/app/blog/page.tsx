"use client";
import React, { useEffect, useState } from "react";
import Meta from "@/components/templates/Meta";
import BreadCrumb from "@/components/templates/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/Blog/BlogCard";
import { baseUrl } from "@/utils/baseUrl";
import { useBlog } from "@/context/BlogContext";

const Blog = () => {
  const [blogCategory, setBlogCategory] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { blog: blogs } = useBlog();

  useEffect(() => {
    getBlogsCategory();
  }, []);

  const getBlogsCategory = async () => {
    const res = await fetch(`${baseUrl}/blogcategory`, {
      method: "GET",
    });
    const data = await res.json();
    setBlogCategory(data);
  };

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Meta title={"مقاله ها"} />
      <BreadCrumb title="مقاله ها" />
      <div dir="rtl" className="flex flex-col md:flex-row gap-3">
        <div className="w-full mx-2 md:w-1/5 my-2 md:ms-3">
          <div className=" bg-gray-100 shadow-md flex flex-col px-3 rounded-md py-5">
            <p className="text-lg font-VazirBold">فیلتر بر اساس </p>
            <hr className="my-2 bg-gray-700 w-[95%] mx-auto" />
            <ul>
              <li
                key="all"
                className="text-md cursor-pointer font-VazirMedium"
                onClick={() => handleCategoryChange(null)}
              >
                همه مقالات
              </li>
              {blogCategory &&
                blogCategory?.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className={`text-md cursor-pointer font-VazirMedium ${
                        selectedCategory === item.title ? "font-bold" : ""
                      }`}
                      onClick={() => handleCategoryChange(item.title)}
                    >
                      {item?.title}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 p-2 w-full md:w-4/5 md:grid-cols-2 gap-4">
          {blogs &&
            blogs?.map((item: any, index: any) => {
              return (
                <div className="w-full rounded-md" key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
                    description={item?.description}
                    image={item?.images[0]?.url}
                    date={new Date(item?.createdAt).toLocaleDateString("fa-IR")}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Blog;
