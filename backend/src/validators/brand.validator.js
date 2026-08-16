const Joi = require("joi");

const brandSchema = Joi.object({

    brandName: Joi.string()
        .min(2)
        .max(100)
        .required(),

    industry: Joi.string()
        .required(),

    tone: Joi.array()
        .items(Joi.string())
        .default([]),

    platforms: Joi.array()
        .items(Joi.string())
        .default([]),

    description: Joi.string()
        .allow("")
        .default(""),

    logo: Joi.string()
        .allow("")
        .default("")

});

module.exports = brandSchema;