import { Router } from "express";
import {
  getUser,
  LoginAdmin,
  LoginUser,
  Logout,
  Register,
  RequestResetPassword,
  ResetPassword,
  getProfile,
} from "../controllers/authCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", Register);
router.post("/loginUser", LoginUser);
router.post("/loginAdmin", LoginAdmin);
router.post("/logout", Logout);

router.post("/request-reset", RequestResetPassword);
router.post("/reset-password/:token", ResetPassword);


router.get("/:id", authMiddleware, getUser);
router.get("/profile", authMiddleware, getProfile);


export default router;
