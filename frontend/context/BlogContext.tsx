"use client";
import { baseUrl } from "@/utils/baseUrl";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
export const BlogContext = createContext({
  blog: [],
  getABlog : (id: any) => {},
  loading: true,
});

export const BlogProvider = ({ children }: any) => {
  const [blog, setBlog] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/blog`);
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getAllBlogs();
  }, []);

  const getABlog = async (id: any) => {
    try {
      const response = await fetch(`${baseUrl}/blog/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <BlogContext.Provider
      value={{
        blog,
        getABlog,
        loading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export function useBlog() {
  return useContext(BlogContext);
}
