import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingInfo: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      mobile: {
        type: String,
        unique: true,
      },
      pincode: {
        type: Number,
      },
    },
    paymentInfo: {
      razorpayOrderId: {
        type: String,
      },
      razorpayPaymentId: {
        type: String,
      },
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
    totalPrice: {
      type: Number,
    },
    totalPriceAfterDiscount: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const model = mongoose.models.Order || mongoose.model("Order", schema);
export default model;