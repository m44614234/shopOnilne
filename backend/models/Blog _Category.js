import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const model =
  mongoose.models.BlogCategory ||
  mongoose.model("BlogCategory", blogcategorySchema);
export default model;
