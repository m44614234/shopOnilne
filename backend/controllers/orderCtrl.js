import asyncHandler from "express-async-handler";
import OrderModel from "../models/Order.js";

export const getOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({}).sort({ createdAt: -1 })
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
});

