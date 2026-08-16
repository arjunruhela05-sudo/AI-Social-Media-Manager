const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const scheduleService = require("../services/schedule.service");

exports.schedulePost = asyncHandler(async (req, res) => {

  const post = await scheduleService.schedulePost(
    req.body,
    req.user._id
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Post scheduled successfully",
      post
    )
  );

});

exports.getScheduledPosts = asyncHandler(async (req, res) => {

  const posts = await scheduleService.getScheduledPosts(
    req.user._id
  );

  res.json(
    new ApiResponse(
      200,
      "Scheduled posts fetched successfully",
      posts
    )
  );

});

exports.getScheduledPostById = asyncHandler(async (req, res) => {

  const post = await scheduleService.getScheduledPostById(
    req.params.id,
    req.user._id
  );

  res.json(
    new ApiResponse(
      200,
      "Scheduled post fetched successfully",
      post
    )
  );

});

exports.updateScheduledPost = asyncHandler(async (req, res) => {

  const post = await scheduleService.updateScheduledPost(
    req.params.id,
    req.body,
    req.user._id
  );

  res.json(
    new ApiResponse(
      200,
      "Scheduled post updated successfully",
      post
    )
  );

});

exports.deleteScheduledPost = asyncHandler(async (req, res) => {

  await scheduleService.deleteScheduledPost(
    req.params.id,
    req.user._id
  );

  res.json(
    new ApiResponse(
      200,
      "Scheduled post deleted successfully"
    )
  );

});