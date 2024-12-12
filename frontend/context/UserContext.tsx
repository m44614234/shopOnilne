// import React, { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { baseUrl } from "@/utils/baseUrl";

// const UserContext = createContext({});

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = async () => {
//     try {
//       const token = Cookies.get("jwt");
//       if (token) {
//         const response: any = await axios.get(
//           `${baseUrl}/auth/profile`,
//           {
//             headers: { authorization: `Bearer ${token}` },
//           }
//         );
//         setUser(response.data.data);
//         console.log("response.data.data =>", response.data.data);
//         console.log("user =>", user);
//       }
//     } catch (error) {
//       console.error("Failed to fetch user profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("user in context =>", user);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, loading, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/baseUrl";

interface UserContextType {
  user: any;
  loading: boolean;
  error: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getUser = async () => {
    try {
      const token = Cookies.get("jwt");
      if (token) {
        const response = await axios.get(`${baseUrl}/auth/profile`, {
          headers: {
            authorization: `Bearer ${token}`,
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

  return (
    <UserContext.Provider value={{ user, loading, error }}>
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
