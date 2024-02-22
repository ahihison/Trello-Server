import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
import { BOARD_TYPES } from '@/utils/constants';
const createNew = async(req: Request, res: Response, next: NextFunction): Promise <void> => {
    const correctCondition  = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title must not be empty',
            'string.min': 'Title must have at least 3 characters',
            'string.max': 'Title must have at most 50 characters',
            'string.trim': 'Title must not have white spaces'
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
        type:Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error){
        const errorMessages = new Error(error as string).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessages);
        next(customError);
    }
};

export const boardValidation = { createNew };