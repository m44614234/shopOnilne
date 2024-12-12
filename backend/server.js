import express from "express";
import dotenv from "dotenv";
import ConnectToDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import productRouter from "./routes/productRoute.js";
import productCommentRouter from "./routes/productComment.js";
import categoryRouter from "./routes/prodoctCategoryRoute.js";
import brandRouter from "./routes/brandRoute.js";
import couponRouter from "./routes/couponRoute.js";
import colorRouter from "./routes/colorRoute.js";
import orderRouter from "./routes/orderRoute.js";
import blogCommentRouter from "./routes/blogCommentsRoute.js";
import blogcategoryRouter from "./routes/blogCatRoute.js";
import blogRouter from "./routes/blogRoute.js";
import contactRouter from "./routes/contactRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
   

const corsOptions = {
  origin: process.env.BASE_URL, // Allow only this origin to access the resource
  methods: ["GET", "POST"], // Allow only these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "authorization"], // Allow only these headers
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoute);

app.use("/api/product", productRouter);
app.use("/api/productComment", productCommentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);

app.use("/api/order", orderRouter);
app.use("/api/blogComment", blogCommentRouter);
app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/blogcategory", blogcategoryRouter);

app.use("/api/upload", uploadRouter);


app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  ConnectToDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});

// app.set("views", "views");

// app.get("/", (req, res) => {
//   // res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// Multer Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'images'); // Directory where files will be stored
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   },
// });

// const upload = multer({
//   storage ,
//   fileFilter : (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//       cb(null, true);
//     } else {
//       console.log('Invalid file type');
//       cb(null, false);
//     }
//   }
// }).array('image', 3)

// Route for uploading multiple files
// app.post('/upload', upload , UploadFile);
