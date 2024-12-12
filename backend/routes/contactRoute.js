import express from "express";
import  { createContact } from '../controllers/contactCtrl.js'

const router = express.Router();

router.post("/", createContact);

export default router;
