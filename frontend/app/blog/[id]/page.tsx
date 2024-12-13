"use client";
import { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import ReactStars from "react-stars";
import { useBlog } from "@/context/BlogContext";
import { useUser } from "@/context/UserContext";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";

const SingleBlog = ({ params }: any) => {
  const [blogData, setBlogData]: any = useState(null);
  const [star, setStar] = useState<any>();
  const [comment, setComment] = useState<string | null>("");
  const [comments, setComments] = useState<[] | null>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = params;

  const { getABlog } = useBlog();
  const { user: userData } = useUser();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = getABlog(id);
        const data = await res;
        setBlogData(data);
      } catch (error: string | any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, []);

  // comments
  const createBlogComment = async () => {
    if (!userData) {
      toast.error("لطفا ابتدا وارد شوید");
    }

    // بررسی وجود امتیاز و کامنت
    if (star === null || comment === null) {
      toast.warning("لطفاً امتیاز و کامنت را وارد کنید");
    }

    const res = await fetch(`${baseUrl}/blogComment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: star, // امتیاز
        body: comment, // متن کامنت
        blog: blogData?._id,
        user: userData?._id,
      }),
    });

    if (res.status === 201 || res.status === 200) {
      toast.success("نظر شما با موفقیت ثبت شد");
      setComment("");
      setStar(null);
    }

    if (res.status === 422 || res.status === 400 || res.status === 404) {
      toast.error("لطفا امتیاز خود را وارد کنید");
    }

    if (res.status === 500) {
      toast.error("خطا در ایجاد کامنت");
    }
    
  };

  const getBlogs = async () => {
    try {
      const res = await fetch(`${baseUrl}/blogComment`, {
        method: "GET",
      });
      const data = await res.json();
      setComments(data);
    } catch (error) {
      toast.error("خطا در دریافت کامنت‌ها");
    }
  };

  useEffect(() => {
    getBlogs();
  });

  const commentLength =
    comments && comments.filter((item: any) => item.blog === id).length;

  return (
    <>
      {/* <BreadCrumb title={blogData?.title} /> */}

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {blogData && (
        <div className="w-full  mx-auto p-2 gap-4 flex flex-col md:p-4">
          <div className=" flex flex-col-reverse p-2  gap-4 md:flex-row">
            <section
              dir="rtl"
              className="w-full flex flex-col p-1 gap-3 rounded-md md:w-1/2 bg-white "
            >
              <p className="flex flex-row gap-2  items-center ">
                <span className="text-md h-full my-auto font-VazirLight ">
                  عنوان:
                </span>
                <span className="text-lg  h-full my-auto font-VazirBlack ">
                  {blogData?.title}
                </span>
              </p>

              <hr className="my-1" />

              <div className="w-full mb-4 flex items-center  flex-row-reverse justify-between">
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-sm font-VazirLight text-gray-500">
                    {new Date(blogData.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <ClockCircleOutlined
                    style={{ color: "gray", fontSize: "15px" }}
                  />
                </div>

                <div className="text-sm items-center w-auto mt-2 text-slate-800  ">
                  <span className="text-md h-full my-auto font-VazirLight text-slate-950">
                    دسته بندی:
                  </span>{" "}
                  {blogData?.category}
                </div>
              </div>

              <p className="text-slate-900 text-md font-VazirBlack  mb-4">
                {blogData?.description}
              </p>
            </section>

            <section
              className="w-full  gap-2 p-4 rounded-md h-full md:w-1/2 bg-slate-100 
              lg:h-full"
            >
              <img
                src={blogData?.images[0]?.url}
                className="img-fluid mb-6 rounded-md"
                alt=""
              />

              <Swiper
                spaceBetween={15}
                dir="rtl"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                breakpoints={{
                  340: { slidesPerView: 2 },
                }}
              >
                {blogData?.images.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={index} className="w-full">
                      <img
                        src={item?.url}
                        className="img-fluid rounded-md"
                        alt=""
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          </div>

          <section className="">
            <div
              dir="rtl"
              className="w-full p-2 bg-white rounded-lg my-4 flex flex-col justify-center"
            >
              <div
                dir="rtl"
                className="text-md items-center  font-VazirBold text-slate-700 "
                id="review"
              >
                <CommentOutlined />
                <span> نظرات کاربران</span>
              </div>
              <div className="review-inner-wrapper">
                <div className="flex flex-col pb-2 w-full justify-end md:flex-row">
                  <div className="w-full flex flex-row justify-end">
                    <div className="flex flex-col mx-auto  items-center gap-4 md:flex-row md:mx-0">
                      <ReactStars
                        count={5}
                        size={24}
                        value={blogData?.totalrating?.toString()}
                        edit={false}
                        color1="#ffd700"
                      />
                      <p dir="rtl" className="mb-0">
                        بر اساس {commentLength?.toLocaleString("fa-IR")} نظرات
                        کاربران
                      </p>
                    </div>
                  </div>
                </div>
                <hr />

                <div dir="rtl" className="flex flex-col pt-4 gap-2">
                  <div
                    dir="rtl"
                    className="text-md items-center  font-VazirBold text-slate-700 "
                    id="review"
                  >
                    <CommentOutlined />
                    <span dir="rtl"> می توانید نظر خود را ثبت کنید.</span>
                  </div>
                  <div dir="ltr" className=" w-full flex justify-end">
                    <ReactStars
                      count={5}
                      size={24}
                      value={star}
                      edit={true}
                      color2="#ffd700"
                      color1="gray"
                      className="flex justify-end w-full"
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-full border  rounded-lg p-4 border-slate-950"
                      placeholder="لطفا نظر خود را بنویسید..."
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="flex content-end mb-4">
                    <button
                      onClick={createBlogComment}
                      className="bg-slate-950 text-white px-4 py-2 rounded-md"
                      type="button"
                    >
                      ثبت نظر
                    </button>
                  </div>
                </div>
                <hr />

                <div className="flex flex-col-reverse mt-4">
                  {comments &&
                    comments
                      .filter((item: any) => item.blog === id)
                      .sort((a: any, b: any) => b.createdAt - a.createdAt)
                      .map((item: any, index: number) => {
                        return (
                          <div className=" py-2  items-center" key={index}>
                            <div className="flex gap-1 justify-between items-center">
                              <div className="flex flex-row gap-1 items-center">
                                <UserOutlined style={{ fontSize: "20px" }} />
                                <span className="mb-0 text-sm font-VazirLight text-slate-800">
                                  {item?.user?.email}
                                </span>
                              </div>
                              <span className="mb-0 text-sm font-VazirLight text-slate-800">
                                {new Date(item.createdAt).toLocaleDateString(
                                  "fa-IR"
                                )}
                              </span>
                            </div>
                            <div className="flex w-full flex-col flex-wrap  gap-1 justify-between items-center md:flex-row">
                              <div
                                dir="rtl"
                                className="  w-full  flex mt-3 justify-start text-start text-md font-VazirMedium md:w-auto"
                              >
                                {item?.body}
                              </div>

                              <div dir="ltr" className="flex flex-row w-auto ">
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={item?.rating}
                                  edit={false}
                                  color2="#ffd700"
                                  color1="gray"
                                />
                              </div>
                            </div>
                            <hr className="mt-1" />
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
