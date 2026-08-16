const Joi = require("joi");

const contentSchema = Joi.object({

    brandName: Joi.string().required(),

    industry: Joi.string().required(),

    platform: Joi.string().required(),

    topic: Joi.string().required(),

    tone: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()

});

module.exports = contentSchema;