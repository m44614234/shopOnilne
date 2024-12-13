import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FundViewOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import ReactStars from "react-stars";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useProduct } from "@/context/ProductContext";


const ProductSwiper = (props: any) => {
  const { AddtoCart, isInCart }: any = useUser();
  const { products : productState , AddtoWish, isInWishlist , AddtoCompare, isInCompare, compare }: any = useProduct();
  
  const { data, index } = props;

  const productImage =
    productState &&
    productState.map((item: any) => {
      return item.images;
    });

  const Image =
    productImage &&
    productImage.map((item: any) => {
      return item[0];
    });

  const singleImage =
    Image &&
    Image.map((item: any) => {
      return item?.url;
    });


  return (
    <div  key={data?._id} className="flex relative   w-full flex-col bg-gray-50 shadow-md  rounded-md hover:bg-slate-100 ">
      <Link
        href={`/singleProduct/${data?._id}`}
        className="text-sm  font-bold cursor-pointer text-slate-800 hover:flex"
      >
        <img
          src={singleImage[index] || "https://picsum.photos/200/300"}
          alt="product image"
          style={{ height: "200px" }}
          className="w-full rounded-t-md"
        />
      </Link>
      <div dir="rtl" className="flex justify-end flex-col px-2 pb-3 pt-1 gap-1">
        <div className="w-full mt-1 flex flex-row items-center justify-between">
          
        </div>
        <p className="text-md text-slate-950 font-VazirBold line-clamp-1">
          {data?.title}
        </p>

        <p className="text-xs text-red-600 font-VazirBold line-clamp-1">
          {data?.brand}
        </p>

        <div
          dir="rtl"
          className="flex flex-row-reverse pt-4 justify-between items-center"
        >
          {isInCart(data?._id) ? (
            <Link
              href="/cart"
            >
              <ShoppingOutlined
                style={{
                  fontSize: "25px",
                  backgroundColor: "lightgreen",
                  padding: "7px",
                  color: "black",
                  borderRadius: "50%",
                }}
              />
            </Link>
          ) : (
            <ShoppingCartOutlined
              style={{
                fontSize: "25px",
                backgroundColor: "orange",
                padding: "7px",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => AddtoCart(data)}
            />
          )}
          <div>
            <span className="text-md text-slate-950 font-bold">
              {data?.price.toLocaleString("fa-IR")}
            </span>
            <span className="text-xs font-VazirMedium mx-1">تومان</span>
          </div>
        </div>
      </div>
       <div className="absolute bg-white/50 p-1 rounded-md top-3 right-3 pr-1">         <div className="flex flex-row gap-2 px-1  md:gap-4">
           {isInWishlist(data._id) ? (
            <HeartFilled
              style={{
                color: "red",
                fontSize: "25px",
              }}
            />
          ) : (
            <HeartOutlined
              style={{
                color: "black",
                fontSize: "25px",
              }}
              onClick={() => AddtoWish(data)}
            />
          )}
         {isInCompare(data._id) ? (
                      <FundViewOutlined
                        style={{ fontSize: "25px", color: "green" }}

                      />
                  ) : (
                    <FundViewOutlined
                      style={{ fontSize: "25px" }}
                      onClick={() => AddtoCompare(data)}
                    />
                  )}
        </div>
    </div>
    </div>
  );
};

export default ProductSwiper;
