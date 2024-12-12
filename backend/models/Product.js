import mongoose from "mongoose";

// Base Product Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["mobile", "laptop", ""],
      required: false,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    tags: String,
    totalrating: {
      type: Number,
      default: 0,
    },

    deviceDetails: {
      mobile: {
        resulation_camera: {
          type: Number,
          required: false,
        },
        teqnology_screen: {
          type: String,
          default: "",
          required: false,
        },
        os: {
          type: String,
          default: "",
          required: false,
        },
        size_screen: {
          type: String,
          default: "",
          required: false,
        },
        boxes: {
          type: String,
          default: "",
          required: false,
        },
        model: {
          type: String,
          default: "",
          required: false,
        },
        time_intruduction: {
          type: String,
          default: "",
          required: false,
        },
        weight: {
          type: Number,
          required: false,
        },
        disc_body: {
          type: String,
          default: "",
          required: false,
        },
        sim_count: {
          type: Number,
          required: false,
        },
        chip: {
          type: String,
          default: "",
          required: false,
        },
        cpu_frequency: {
          type: String,
          default: "",
          required: false,
        },
        internal_memory: {
          type: String,
          default: "",
          required: false,
        },
        ram_amount: {
          type: String,
          default: "",
          required: false,
        },
        support_ram: {
          type: Boolean,
          default: false,
          required: false,
        },

        telecommunicationـnetworks: {
          type: String,
          default: "",
          required: false,
        },
        supportedـcommunicationـnetworks: {
          type: String,
          default: "",
          required: false,
        },
        camera_front: {
          type: Number,
          required: false,
        },
        sound_output: {
          type: String,
          default: "",
          required: false,
        },
        battery_amount: {
          type: String,
          default: "",
          required: false,
        },
        option_charging: {
          type: String,
          default: "",
          required: false,
        },
        desc_battery: {
          type: String,
          default: "",
          required: false,
        },
        nfc: {
          type: Boolean,
          default: false,
          required: false,
        },
        more_info: {
          type: String,
          default: "",
          required: false,
        },
      },
      laptop: {
        weight: {
          type: Number,
          required: false,
        },
        dimensions: {
          type: String,
          required: false,
        },
        processor_manufacturer: {
          type: String,
          required: false,
        },
        processor_generation: {
          type: String,
          required: false,
        },
        processor_series: {
          type: String,
          required: false,
        },
        processor_model: {
          type: String,
          required: false,
        },
        processor_speed_range: {
          type: String,
          required: false,
        },
        processor_frequency: {
          type: String,
          required: false,
        },
        cache_memory: {
          type: String,
          required: false,
        },
        ram_memory: {
          type: String,
          required: false,
        },
        hard_memory: {
          type: String,
          required: false,
        },
        hard_type: {
          type: String,
          required: false,
        },
        graphics_manufacturer: {
          type: String,
          required: false,
        },
        graphics_model: {
          type: String,
          required: false,
        },
        graphics_memory: {
          type: String,
          required: false,
        },
        size_screen: {
          type: String,
          required: false,
        },
        type_screen: {
          type: String,
          required: false,
        },
        description_screen: {
          type: String,
          required: false,
        },
        option_screen: {
          type: String,
          required: false,
        },
        webcam: {
          type: String,
          required: false,
        },
        drive: {
          type: String,
          required: false,
        },
        lighting: {
          type: String,
          required: false,
        },
        ports: {
          type: String,
          required: false,
        },
        usb2: {
          type: Number,
          required: false,
        },
        usb3: {
          type: Number,
          required: false,
        },
        usb_count: {
          type: Number,
          required: false,
        },
        os: {
          type: String,
          required: false,
        },
        boxes: {
          type: String,
          required: false,
        },
        battery: {
          type: String,
          required: false,
        },
      },
    },
  },
  { timestamps: true }
);

// Create the base model
const model = mongoose.models.Product || mongoose.model("Product", productSchema);
export default model;

// Pre-save middleware
// productSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

// Virtual for formatted price
// productSchema.virtual("formattedPrice").get(function () {
//   return `$${this.price.toFixed(2)}`;
// });

// Instance method
// productSchema.methods.decreaseStock = async function (quantity) {
//   if (this.stock >= quantity) {
//     this.stock -= quantity;
//     return await this.save();
//   }
//   throw new Error("Insufficient stock");
// };

// Static method
// productSchema.statics.findByType = function (type) {
//   return this.find({ type: type });
// };

