const Joi = require("joi");

const scheduleSchema = Joi.object({

    contentId: Joi.string().required(),

    platform: Joi.string().required(),

    scheduledDate: Joi.date().required(),

    status: Joi.string()
        .valid(
            "Scheduled",
            "Published",
            "Draft",
            "Failed"
        )
        .default("Scheduled")

});

module.exports = scheduleSchema;