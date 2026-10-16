const Joi = require("joi");


// Joi — validates incoming request data
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().pattern(/^[A-Za-z .,()]+$/).required(),
        description : Joi.string().pattern(/^[A-Za-z .,()]+$/).required(),
        location : Joi.string().pattern(/^[A-Za-z .,()]+$/).required(),
        country : Joi.string().pattern(/^[A-Za-z .,()]+$/).required(),
        price : Joi.number().required().min(0),
        image:  Joi.object({
            filename: Joi.string().allow(""),
            url : Joi.string().uri().allow("",null),
        })
    }).required(),
});

