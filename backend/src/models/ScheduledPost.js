const mongoose = require("mongoose");

const scheduledPostSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedContent",
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Published", "Failed"],
      default: "Scheduled",
    },

    notes: {
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

module.exports = mongoose.model(
  "ScheduledPost",
  scheduledPostSchema
);