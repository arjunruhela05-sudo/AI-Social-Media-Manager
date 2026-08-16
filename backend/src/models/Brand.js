const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    tone: {
      type: [String],
      default: [],
    },

    platforms: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);