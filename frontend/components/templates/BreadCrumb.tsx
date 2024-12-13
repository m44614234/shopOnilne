import React from "react";
import Link from "next/link";

const BreadCrumb = (props : any) => {
  const { title } = props;
  return (
    <div dir="rtl" className="w-full justify-center mb-0 py-4">
        <div className=" flex flex-row">
          <div className="w-full justify-center">
            <p className="text-center mb-0 font-VazirBold">
              <Link href="/" className="text-dark ">
                خانه &nbsp;
              </Link>
              / {title}
            </p>
          </div>
        </div>
      </div>
  );
};

export default BreadCrumb;
