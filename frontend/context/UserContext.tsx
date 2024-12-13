import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";

interface UserContextType {
  user: any;
  loading: boolean;
  error: any;
  cart: [];
  clearCart: () => void;
  AddtoCart: (product: any) => void;
  AddQuentity: (productId: any) => void;
  RemoveQuentity: (productId: any) => void;
  RemoveFromCart: (productId: any) => void;
  isInCart: (productId: any) => boolean;
  updateUser: (data: any) => Promise<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getUser = async () => {
    const tokenDetails: any = Cookies.get("jwt");
    console.log("tokenDetails =>", tokenDetails);

    try {
      // تابعی برای بررسی تاریخ انقضای توکن
      const isTokenExpired = (token: string) => {
        console.log("token =>", token);
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("payload =>", payload);
          const expirationTime = payload.exp * 1000; // تبدیل به میلی‌ثانیه
          console.log("expirationTime =>", expirationTime);
          return Date.now() > expirationTime; // بررسی تاریخ انقضا
        } catch (error) {
          console.log("error in ...", error);
          if (isTokenExpired(tokenDetails)) {
            Cookies.remove("jwt"); // حذف توکن از کوکی‌ها
          }
        }
      };

      if (tokenDetails) {
        const response = await axios.get(`${baseUrl}/auth/profile`, {
          headers: {
            authorization: `Bearer ${tokenDetails}`,
          },
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //  Start Cart Block //
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const isInCart = (productId: any) => {
    return cart.some((item: any) => item._id === productId);
  };

  useEffect(() => {
    const cartItem = localStorage?.getItem("cart");
    if (cartItem) {
      setCart(JSON.parse(cartItem));
    }
  }, []);

  function updateLocalStorage(items: any) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }

  function AddtoCart(item: any) {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    if (!item) {
      return;
    }
    cart.some((cartItem: any) => cartItem._id === item._id);
    cart.map((cartItem: any) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      }
      return cartItem;
    });

    setCart((prevCartItems: any) => {
      const newCartItem = { ...item, quantity: 1 };
      const newCartItems = [...prevCartItems, newCartItem];
      updateLocalStorage(newCartItems);
      return newCartItems;
    });
    toast.success("محصول به سبد خرید اضافه شد");
  }

  function RemoveFromCart(productId: any) {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    setCart((prevCartItems: any) => {
      const newCartItems = prevCartItems.filter(
        (product: any) => product._id !== productId
      );
      updateLocalStorage(newCartItems);
      return newCartItems;
    });
    toast.success("محصول از سبد خرید حذف شد");
  }

  function AddQuentity(productId: any) {
    setCart((prevCartItems: any) => {
      return prevCartItems.map((product: any) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    });
  }

  function RemoveQuentity(productId: any) {
    setCart((prevCartItems: any) => {
      return prevCartItems.map((product: any) => {
        if (product._id === productId) {
          const updatedQuantity = Math.max(product.quantity - 1, 1);
          return {
            ...product,
            quantity: updatedQuantity,
          };
        }
        return product;
      });
    });
  }

  function clearCart() {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    setCart([]);
    updateLocalStorage([]);
  }
  //  End Cart Block //

  // Start Update User Block //
  const updateUser = async (data: any): Promise<any> => {
    const tokenDetails = Cookies.get("jwt");
    try {
      const response = await axios.put(`${baseUrl}user/edit-user`, data.data, {
        headers: {
          authorization: `Bearer ${tokenDetails}`,
        },
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error user", error);
    }
  };
  // End Update User Block //

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        cart,
        isInCart,
        AddtoCart,
        RemoveFromCart,
        AddQuentity,
        RemoveQuentity,
        clearCart,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
