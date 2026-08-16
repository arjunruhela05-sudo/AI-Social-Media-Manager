const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const aiService = require("../services/ai.service");
const contentService = require("../services/content.service");

exports.generateContent = asyncHandler(async (req, res) => {

    const aiResult = await aiService.generateContent(req.body);

    const saved = await contentService.saveGeneratedContent(
        {
            ...req.body,
            ...aiResult,
        },
        req.user._id
    );

    res.json(
        new ApiResponse(
            200,
            "Content generated successfully",
            saved
        )
    );

});

exports.getHistory = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const history = await contentService.getHistory(

        req.user._id,

        page,

        limit

    );

    res.json(

        new ApiResponse(

            200,

            "History fetched successfully",

            history

        )

    );

});

exports.getContentById = asyncHandler(async (req, res) => {

    const item = await contentService.getContentById(
        req.params.id,
        req.user._id
    );

    res.json(
        new ApiResponse(
            200,
            "Content fetched",
            item
        )
    );

});

exports.deleteContent = asyncHandler(async (req, res) => {

    await contentService.deleteContent(
        req.params.id,
        req.user._id
    );

    res.json(
        new ApiResponse(
            200,
            "Deleted Successfully"
        )
    );

});