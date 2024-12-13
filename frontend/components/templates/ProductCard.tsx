import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FundViewOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import ReactStars from "react-stars";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useProduct } from "@/context/ProductContext";


const ProductCard = (props: any) => {
  const { AddtoCart, isInCart }: any = useUser();
  const { products : productState , AddtoWish, isInWishlist , AddtoCompare, isInCompare, compare }: any = useProduct();

  const { data } = props;

  

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
    <div key={data?._id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {data &&
        data?.map((item: any, index: any) => {
          return (
            <div 
            className="flex relative   w-full flex-col bg-gray-50 shadow-md  rounded-md hover:bg-slate-100 ">
      <Link
        href={`/singleProduct/${item?._id}`}
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
          {/* <ReactStars
            count={5}
            size={16}
            value={parseInt(data?.totalrating)}
            edit={false}
            className="text-start flex justify-start  items-start"
            // activeColor="#ffd700"
            color1="#ffd700"
          /> */}
        </div>
        <p className="text-md text-slate-950 font-VazirBold line-clamp-1">
          {item?.title}
        </p>

        <p className="text-xs text-red-600 font-VazirBold line-clamp-1">
          {item?.brand}
        </p>

        <div
          dir="rtl"
          className="flex flex-row-reverse pt-4 justify-between items-center"
        >
          {isInCart(item?._id) ? (
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
              {item?.price?.toLocaleString("fa-IR")}
            </span>
            <span className="text-xs font-VazirMedium mx-1">تومان</span>
          </div>
        </div>
      </div>
       <div className="absolute bg-white/50 p-1 rounded-md top-3 right-3 pr-1">         <div className="flex flex-row gap-2 px-1  md:gap-4">
           {isInWishlist(item._id) ? (
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
         {isInCompare(item._id) ? (
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
        })}
    </div>
  );
};

export default ProductCard;
