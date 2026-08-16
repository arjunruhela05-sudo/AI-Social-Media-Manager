const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const dashboardService = require("../services/dashboard.service");

exports.getDashboard = asyncHandler(async (req, res) => {

    const data = await dashboardService.getDashboardData(
        req.user._id
    );

    res.json(
        new ApiResponse(
            200,
            "Dashboard fetched successfully",
            data
        )
    );

});