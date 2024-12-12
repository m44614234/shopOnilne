import express from "express";
import  { getOrders } from '../controllers/orderCtrl.js'

const router = express.Router();
router.get("/" , getOrders)

export default router