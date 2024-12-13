import Link from "next/link";
import React from "react";

const BlogCard = (props: any) => {
  const { id, title, description, image, date } = props;
  return (
    <Link href={`/blog/${id}`} className=" flex relative flex-col gap-2">
      <div className="card-image">
        <img
          src={image ? image : "images/blog-1.jpg"}
          className="img-fluid w-full h-[200px] object-cover rounded-md"
          alt="blog"
        />
      </div>
      <div className="blog-content items-center absolute bg-white/60 px-2 rounded-b-md w-full bottom-0 ">
        {/* <p className="date">{date}</p> */}
        <div className="flex flex-row py-2 justify-between items-center">
          <p className="text-md font-VazirBlack line-clamp-1">{title}</p>
        </div>
      </div>
      <p className="text-sm absolute top-2 left-2 px-2 py-1 bg-gray-800 text-white rounded-md ">
        {date.substring(0, 10)}
      </p>
    </Link>
  );
};

export default BlogCard;
