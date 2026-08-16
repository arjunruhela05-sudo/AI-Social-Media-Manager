const Brand = require("../models/Brand");

const createBrand = async (data, userId) => {
  return await Brand.create({
    ...data,
    user: userId,
  });
};

const getBrands = async (userId) => {
  return await Brand.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const getBrandById = async (id, userId) => {
  return await Brand.findOne({
    _id: id,
    user: userId,
  });
};

const updateBrand = async (id, data, userId) => {
  return await Brand.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteBrand = async (id, userId) => {
  return await Brand.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};