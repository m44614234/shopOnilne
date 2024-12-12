import asyncHandler from "express-async-handler";
import ContactModel from "../models/Contact.js";

export const createContact = asyncHandler(async (req, res) => {
  try {
    const newContact = await ContactModel.create(req.body);
    res.json(newContact);
  } catch (error) {
    throw new Error(error);
  }
});
