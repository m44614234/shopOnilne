import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/baseUrl";

const UserContext = createContext({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get("jwt");
      if (token) {
        const response: any = await axios.get(
          `${baseUrl}/auth/profile`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.data);
        console.log("response.data.data =>", response.data.data);
        console.log("user =>", user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("user in context =>", user);


  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
