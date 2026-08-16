const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");
const { generateToken } = require("../utils/token");

exports.register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.body);

    const token = generateToken(user._id);

    res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            {
                token,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    companyName: user.companyName,
                    role: user.role
                }
            }
        )
    );
});

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await authService.login(email, password);

    const token = generateToken(user._id);

    res.json(
        new ApiResponse(
            200,
            "Login successful",
            {
                token,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    companyName: user.companyName,
                    role: user.role
                }
            }
        )
    );
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      req.user
    )
  );
});