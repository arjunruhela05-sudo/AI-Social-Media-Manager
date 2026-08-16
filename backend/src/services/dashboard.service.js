const Brand = require("../models/Brand");
const GeneratedContent = require("../models/GeneratedContent");
const ScheduledPost = require("../models/ScheduledPost");
const insightsService = require("./insights.service");

const getDashboardData = async (userId) => {

    const totalBrands = await Brand.countDocuments({
        user: userId
    });

    const generatedPosts = await GeneratedContent.countDocuments(
        {user: userId}
    );

    const totalAIRequests = generatedPosts;
    
    const scheduledPosts = await ScheduledPost.countDocuments({
    user: userId,
    status: "Scheduled"
});

    const publishedPosts = await ScheduledPost.countDocuments({
        user: userId,   
        status: "Published"
    });

    const draftPosts = await ScheduledPost.countDocuments({
        user: userId,
        status: "Draft"
    });

    const failedPosts = await ScheduledPost.countDocuments({
        user: userId,
        status: "Failed"
    });

    const recentPosts = await GeneratedContent
        .find({ user: userId})
        .sort({ createdAt: -1 })
        .limit(5);

    const platformBreakdown = await ScheduledPost.aggregate([
    {
        $match: {
            user: userId
        }
    },
    {
        $group: {
            _id: "$platform",
            total: {
                $sum: 1
            }
        }
    }
]);     

    const platformStats = {};

    platformBreakdown.forEach((item) => {
        platformStats[item._id] = item.total;
    });

    const completionRate =
        scheduledPosts === 0
            ? 0
            : Number(
                (
                    (publishedPosts / scheduledPosts) *
                    100
                ).toFixed(2)
            );

    const dashboard = {

        totalBrands,

        generatedPosts,

        totalAIRequests,

        scheduledPosts,

        publishedPosts,

        draftPosts,

        failedPosts,

        completionRate,

        platformBreakdown: platformStats,

        recentPosts

    };

    let insights;

    try {

        insights = await insightsService.generateInsights(dashboard);

    } catch (error) {

        console.error(
            "Insights generation failed:",
            error.message
        );

        insights = {

            summary:
                "AI insights are temporarily unavailable.",

            strengths: [],

            weaknesses: [],

            recommendations: [],

            bestPlatform: null,

            postingSuggestion: null

        };

    }

    return {

        ...dashboard,

        insights

    };

};

module.exports = {

    getDashboardData

};