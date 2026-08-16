const GeneratedContent = require("../models/GeneratedContent");

const saveGeneratedContent = async (data, userId) => {
  return await GeneratedContent.create({
    ...data,
    user: userId,
  });
};

const getHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const total = await GeneratedContent.countDocuments({
    user: userId,
  });

  const data = await GeneratedContent.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  return {
    data,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getContentById = async (id, userId) => {
  return await GeneratedContent.findOne({
    _id: id,
    user: userId,
  });
};

const deleteContent = async (id, userId) => {
  return await GeneratedContent.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

module.exports = {
  saveGeneratedContent,
  getHistory,
  getContentById,
  deleteContent,
};