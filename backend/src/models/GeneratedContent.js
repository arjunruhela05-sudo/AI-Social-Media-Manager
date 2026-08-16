const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema(
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

    platform: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    tone: {
      type: [String],
      default: [],
    },

    captions: {
      type: [
        {
          style: {
            type: String,
            required: true,
          },

          text: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    hashtags: {
      type: [String],
      default: [],
    },

    cta: {
      type: String,
      default: "",
    },

    emojiStyle: {
      type: String,
      default: "",
    },

    bestPostingTime: {
      day: {
        type: String,
        default: "",
      },

      time: {
        type: String,
        default: "",
      },

      reason: {
        type: String,
        default: "",
      },
    },

    engagementPrediction: {
      level: {
        type: String,
        default: "",
      },

      score: {
        type: Number,
        default: 0,
      },

      reason: {
        type: String,
        default: "",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GeneratedContent",
  generatedContentSchema
);