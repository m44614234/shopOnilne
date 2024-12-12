import Image from "next/image";
import Link from "next/link";

interface Props {
  img: string;
  title: string;
  sub: string;
  desc: string;
  link: string;
  customStyle: React.CSSProperties;
  titleColor: string;
  textDescColor: string;
  subColor: string;
  textLink : string;
  bgLinkColor: string;
  textLinkColor: string;
}
const Banner_Products = ({
  img,
  title,
  sub,
  desc,
  link,
  customStyle,
  titleColor,
  textDescColor,
  subColor,
  textLink,
  bgLinkColor,
  textLinkColor,
}: Props) => {
  return (
    <div
      className={` flex w-full mt-5 border  p-3 rounded-md  flex-col-reverse  md:flex-row`}
     style={customStyle}
    >
      <div
        dir="rtl"
        className="w-full flex flex-col justify-center gap-5  rounded-l-md md:w-1/2"
      >
        <div className="flex flex-col gap-2">
          <p
            className={`text-md font-bold font-VazirLight text-start text-${subColor} items-center`}
          >
            {sub}
          </p>
          <p
            className={`text-3xl font-bold font-VazirBold text-start text-${titleColor} items-center`}
          >
            {title}
          </p>
        </div>
        <p
          className={`text-md  font-bold font-VazirLight text-start text-${textDescColor} items-center lg:pl-4`}
        >
          {desc}
        </p>
        <Link
          href={link}
          className={`bg-${bgLinkColor} w-48 px-3 py-2 rounded-md text-${textLinkColor} text-md font-VazirBlack`}
        >
         {textLink}
        </Link>
      </div>
      <div className="w-full rounded-r-md md:w-1/2">
        <img
          src={img}
          className="w-full h-full rounded-full p-2 mx-auto  object-cover lg:w-[400px] lg:h-[400px]"
          alt="login"
        />
      </div>
    </div>
  );
};
export default Banner_Products;
