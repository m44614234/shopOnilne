import Joi from "joi";

const productValidation = {
  create: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is Required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is Required",
    }),
    price: Joi.number().required().messages({
      "number.base": "Price is Required",
    }),
    brand: Joi.string().required().messages({
      "string.empty": "Brand is Required",
    }),
    category: Joi.string().required().messages({
      "string.empty": "Category is Required",
    }),
    tags: Joi.string(),
    color: Joi.array().min(1).required().messages({
      "array.min": "Pick at least one color",
      "array.base": "Color is Required",
    }),
    quantity: Joi.number().required().messages({
      "number.base": "Quantity is Required",
    }),
    type: Joi.string().valid("mobile", "laptop", ""),

    deviceDetails: Joi.object({
      mobile: Joi.when("type", {
        is: "mobile",
        then: Joi.object({
          resulation_camera: Joi.number().allow("").optional(),
          teqnology_screen: Joi.string().allow("").optional(),
          os: Joi.string().allow("").optional(),
          size_screen: Joi.string().allow("").optional(),
          boxes: Joi.string().allow("").optional(),
          model: Joi.string().allow("").optional(),
          time_intruduction: Joi.string().allow("").optional(),
          weight: Joi.number().allow("").optional(),
          disc_body: Joi.string().allow("").optional(),
          sim_count: Joi.number().allow("").optional(),
          chip: Joi.string().allow("").optional(),
          cpu_frequency: Joi.string().allow("").optional(),
          internal_memory: Joi.string().allow("").optional(),
          ram_amount: Joi.string().allow("").optional(),
          support_ram: Joi.boolean().allow("").optional(),
          telecommunication: Joi.string().allow("").optional(),
          supportedـcommunicationـnetworks: Joi.string().allow("").optional(),
          camera_front: Joi.number().allow("").optional(),
          sound_output: Joi.string().allow("").optional(),
          option_charging: Joi.string().allow("").optional(),
          desc_battery: Joi.string().allow("").optional(),
          nfc: Joi.boolean().allow("").optional(),
          more_info: Joi.string().allow("").optional(),
        }),
      }),

      laptop: Joi.when("type", {
        is: "laptop",
        then: Joi.object({
          weight: Joi.number().allow("").optional(),
          dimensions: Joi.string().allow("").optional(),
          processor_manufacturer: Joi.string().allow("").optional(),
          processor_generation: Joi.string().allow("").optional(),
          processor_series: Joi.string().allow("").optional(),
          processor_model: Joi.string().allow("").optional(),
          processor_speed_range: Joi.string().allow("").optional(),
          processor_frequency: Joi.string().allow("").optional(),
          cache_memory: Joi.string().allow("").optional(),
          ram_memory: Joi.string().allow("").optional(),
          hard_memory: Joi.string().allow("").optional(),
          hard_type: Joi.string().allow("").optional(),
          graphics_manufacturer: Joi.string().allow("").optional(),
          graphics_model: Joi.string().allow("").optional(),
          graphics_memory: Joi.string().allow("").optional(),
          size_screen: Joi.string().allow("").optional(),
          type_screen: Joi.string().allow("").optional(),
          description_screen: Joi.string().allow("").optional(),
          option_screen: Joi.string().allow("").optional(),
          webcam: Joi.string().allow("").optional(),
          drive: Joi.string().allow("").optional(),
          lighting: Joi.string().allow("").optional(),
          ports: Joi.string().allow("").optional(),
          usb2: Joi.number().allow("").optional(),
          usb3: Joi.number().allow("").optional(),
          usb_count: Joi.number().allow("").optional(),
          os: Joi.string().allow("").optional(),
          boxes: Joi.string().allow("").optional(),
          battery: Joi.string().allow("").optional(),
        }),
      }),
    }),

    images: Joi.array().items(
      Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().required(),
      })
    ),
  }),
};

export default productValidation;