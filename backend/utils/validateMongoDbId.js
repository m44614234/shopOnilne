const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("این آیدی نامعتبر است / یافت نشد"); 
};
module.exports = validateMongoDbId;
