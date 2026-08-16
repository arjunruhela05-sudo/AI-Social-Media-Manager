const Joi = require("joi");

const registerSchema = Joi.object({

    fullName: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .max(30)
        .required(),

    companyName: Joi.string()
        .allow("")
        .default("")

});

const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()

});

module.exports = {

    registerSchema,

    loginSchema

};