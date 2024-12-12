import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

interface ProductContextType {
  products: any;
  loading: boolean;
  error: any;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{
  children: React.ReactNode;

}> = ({ children }) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

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

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
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
