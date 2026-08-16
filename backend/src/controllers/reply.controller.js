const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const replyService = require("../services/reply.service");

exports.generateReply = asyncHandler(async (req, res) => {

  const reply = await replyService.generateReply(req.body);

  res.json(
    new ApiResponse(
      200,
      "Reply generated successfully",
      reply
    )
  );

});