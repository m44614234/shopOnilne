import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const schema = new mongoose.Schema(
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
const model = mongoose.models.PCategory || mongoose.model("PCategory", schema);
export default model;
