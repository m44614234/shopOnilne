"use client";
import { useProduct } from "@/context/ProductContext";
import Image from "next/image";

export default function Home() {
  const {product} = useProduct()
  console.log("products from context =>", product);
  return (
    <>
    </>
  );
}
