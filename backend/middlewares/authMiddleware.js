import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("authorization =>", authorization);

  // const token = authorization.split("Bearer ")[1];
  const token = authorization.split("Bearer ")[1];
  console.log("token =>", token);

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const authMiddleware = async (req, res, next) => {
//   const authorization = req.headers.authorization;
//   console.log("authorization =>", authorization);

//   if (!authorization) {
//     return res.status(401).json({ error: "Unauthorized - No Token Provided" });
//   }

//   const token = authorization.split("Bearer ")[1];

  
//   console.log("token =>", token);
//   if (!token || token === "") {
//     return res
//       .status(401)
//       .json({ error: "Unauthorized - Invalid Token Format" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(401).json({ error: "Unauthorized - Invalid Token" });
//     }

//     const user = await UserModel.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log("Error in protectRoute middleware: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const isAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers.cookie;
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
