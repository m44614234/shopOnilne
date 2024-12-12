import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/mailtrap.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";


export const Register = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "تمام فیلد ها الزامی است",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "این ایمیل قبلا ثبت شده است",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      email: email.toLowerCase(),
      role: "user",
      password: hashedPassword,
    });

    const savedUser = await user.save();

    sendEmail({
      subject: "ثبت نام",
      html: "<p>ثبت نام شما با موفقیت انجام شد میتوانید وارد شوید</p>",
      userEmail: email,
    });

    return res.status(201).json({
      success: true,
      message: "کاربر با موفقیت ثبت شد",
      data: savedUser,
    });
  } catch (err) {
    console.log("err =>", err);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email && password =>", email + password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "تمام فیلد ها الزامی است",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربری با این ایمیل یافت نشد",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(422).json({
        success: false,
        message: "رمز عبور  یا ایمیل اشتباه است",
      });
    }

    const accessToken = generateToken(user._id);

    // Set the access token in a cookie
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // Expires in 72 hours (adjust as needed)
    });

    console.log("user =>", user);

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      data: user,
      token: accessToken,
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "تمام فیلد ها الزامی است",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربری با این ایمیل یافت نشد",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "شما ادمین نیستید",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "رمز عبور اشتباه است",
      });
    }

    const accessToken = generateToken(user._id);

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // Expires in 72 hours (adjust as needed)
    });

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      data: user,
      token: accessToken,
    });
  } catch (error) {
    console.log("error =>", error);
  }
};


export const getUser = async (req, res) => {
  const id = req.user._id;
  
  const userId = id.toString()
  console.log("userId =>", userId);

  // console.log("req.params.id =>", req.params.id);
  // console.log("req.params._id =>", req.params._id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error("error get user =>", error);
      res.status(500).json({ message: 'Server error' });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      success: true,
      message: "خروج با موفقیت انجام شد",
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

export const RequestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد",
      });
    }

    // Generate a reset token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      httpOnly: true,
    });

    // Set reset token and expiration
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with reset token
    sendEmail({
      userEmail: email,
      subject: "بازیابی رمز عبور",
      html: `<p>درخواست بازیابی رمز عبوز</p>
      <p>برای بازیابی رمز عبور <a href="http://localhost:3000/reset-password/${token}" >این لینک را</a> کلیک کنید </p>`,
    });

    return res.status(200).json({
      success: true,
      message: "لینک بازیابی رمز عبور به ایمیل شما ارسال شد",
    });
  } catch (error) {
    console.error("Error in RequestResetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "خطا در پردازش درخواست",
    });
  }
};

export const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).send("توکن منقضی شده است");
  }

  const user = await UserModel.findOne({ email: decoded.email });
  if (
    !user ||
    user.resetToken !== token ||
    user.resetTokenExpiration < Date.now()
  ) {
    return res.status(400).send("توکن منقضی شده است");
  }

  // Update password and clear reset token
  user.password = bcrypt.hashSync(newPassword, 10); // Make sure to hash this in production!
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "رمز عبور با موفقیت تغییر یافت",
  });
};

export const getProfile = asyncHandler(async (req, res) => {
  
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  try {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.log("error =>", error);
    throw new Error("Error fetching user profile");
  }
});
