const BrandService = require("../services/brand.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.createBrand(
    req.body,
    req.user._id
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Brand created successfully", brand));
});

exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await BrandService.getBrands(
    req.user._id
  );

  res.json(
    new ApiResponse(200, "Brands fetched successfully", brands)
  );
});

exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await BrandService.getBrandById(
    req.params.id,
    req.user._id
  );

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  res.json(
    new ApiResponse(200, "Brand fetched successfully", brand)
  );
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.updateBrand(
    req.params.id,
    req.body,
    req.user._id
  );

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  res.json(
    new ApiResponse(200, "Brand updated successfully", brand)
  );
});

exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.deleteBrand(
    req.params.id,
    req.user._id
  );

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  res.json(
    new ApiResponse(200, "Brand deleted successfully")
  );
});