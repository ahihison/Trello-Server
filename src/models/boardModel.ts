import Joi from "joi";
const BOARD_CONLECTION_NAME = "boards";
const BOARD_CONLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
});