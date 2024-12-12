import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true, // اطمینان از اینکه کاربر باید وجود داشته باشد
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true, // اطمینان از اینکه محصول باید وجود داشته باشد
    },
    body: {
      type: String,
      required: true, // تصحیح نام 'require' به 'required'
    },
    rating: {
      type: Number,
      required: true, // امتیاز الزامی است
      min: 1, // حداقل امتیاز
      max: 5, // حداکثر امتیاز
    },
   
  },
  {
    timestamps: true, // اضافه کردن زمان‌های ایجاد و به‌روزرسانی
  }
);

// بررسی وجود مدل و ایجاد آن در صورت عدم وجود
const model = mongoose.models.Product_Comment || mongoose.model("Product_Comment", commentSchema);
export default model;