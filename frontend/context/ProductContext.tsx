import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ProductContextType {
  products: any;
  loading: boolean;
  error: any;
  wish: any[];
  AddtoWish: (product: any) => void;
  RemoveFromWish: (productId: any) => void;
  isInWishlist: (productId: any) => boolean;
  compare: any[];
  AddtoCompare: (product: any) => void;
  RemoveFromCompare: (productId: any) => void;
  isInCompare: (productId: any) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [wish, setWish] = useState<any[]>([]);
  const [compare, setCompare] = useState<any[]>([]);
  const { user: userData } = useUser();

  const router = useRouter();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  //  Start Wishlist Block //
  const updateLocalStorage = (items: any) => {
    localStorage?.setItem("wish", JSON.stringify(items));
  };

  const isInWishlist = (productId: any) => {
    return wish.some((item: any) => item._id === productId);
  };

  const AddtoWish = (item: any) => {
    if (!userData) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    if (!isInWishlist(item._id)) {
      const newItems = [...wish, { ...item, quantity: 1 }];
      setWish(newItems);
      updateLocalStorage(newItems);
      toast.success("با موفقیت به لیست علاقه مندی‌ها اضافه شد");
    } else {
      toast.info("قبلا به لیست علاقه مندی‌ها اضافه شده است");
    }
  };

  const RemoveFromWish = (productId: any) => {
    if (!userData) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    const newCartItems = wish.filter(
      (product: any) => product._id !== productId
    );
    setWish(newCartItems);
    updateLocalStorage(newCartItems);
    toast.success("با موفقیت حذف شد");
  };
  //  End Wishlist Block //

  // Start Compare Block //
  const updateLocalStorageCompare = (items: any) => {
    if (localStorage) {
      localStorage.setItem("compare", JSON.stringify(items));
    }
  };

  const isInCompare = (productId: any) => {
    return compare.some((item: any) => item._id === productId);
  };

  function AddtoCompare(item: any) {
    if (compare.length > 0 && compare[0].category !== item.category) {
      toast.error("محصولات باید از یک دسته باشند.");
      return;
    }

    if (!isInCompare(item._id)) {
      setCompare((prevItems: any) => {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        updateLocalStorageCompare(newItems);
        router.push("/compare");
        toast.success("با موفقیت به صفحه مقایسه اضافه شد");
        return newItems;
      });
    } else {
      toast.info("قبلا به صفحه مقایسه اضافه شده است");
    }
  }

  function RemoveFromCompare(productId: any) {
    setCompare((prevCartItems: any) => {
      const newCartItems = prevCartItems.filter(
        (product: any) => product._id !== productId
      );
      updateLocalStorageCompare(newCartItems);
      toast.success("با موفقیت حذف شد");
      return newCartItems;
    });
  }

  useEffect(() => {
    const cartItem = localStorage?.getItem("compare");
    if (cartItem) {
      setCompare(JSON.parse(cartItem));
    }
  }, []);

  // End Compare Block //

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        wish,
        isInWishlist,
        AddtoWish,
        RemoveFromWish,
        compare,
        AddtoCompare,
        RemoveFromCompare,
        isInCompare,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
