const ScheduledPost = require("../models/ScheduledPost");

const schedulePost = async (data, userId) => {
  return await ScheduledPost.create({
    ...data,
    user: userId,
  });
};

const getScheduledPosts = async (userId) => {
  return await ScheduledPost.find({
    user: userId,
  })
    .populate("contentId")
    .sort({
      scheduledDate: 1,
    });
};

const getScheduledPostById = async (id, userId) => {
  return await ScheduledPost.findOne({
    _id: id,
    user: userId,
  }).populate("contentId");
};

const updateScheduledPost = async (
  id,
  data,
  userId
) => {
  return await ScheduledPost.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
    }
  );
};

const deleteScheduledPost = async (
  id,
  userId
) => {
  return await ScheduledPost.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

module.exports = {
  schedulePost,
  getScheduledPosts,
  getScheduledPostById,
  updateScheduledPost,
  deleteScheduledPost,
};