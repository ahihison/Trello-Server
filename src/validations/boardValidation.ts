import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
import { BOARD_TYPES } from '@/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
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
const update = async(req: Request, res: Response, next: NextFunction): Promise <void> => {
    //update dont use required
    const correctCondition  = Joi.object({
        title: Joi.string().min(3).max(50).trim().strict(),
        description: Joi.string().min(3).max(256).trim().strict(),
        type:Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
        columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    });
    try {
        await correctCondition.validateAsync(req.body, 
            { 
                abortEarly: false,
                allowUnknown: true //dont need to validate all fields
            }
        );
        next();
    } catch (error){
        const errorMessages = new Error(error as string).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessages);
        next(customError);
    }
};

const moveCardToDifferentColumn = async(req: Request, res: Response, next: NextFunction): Promise <void> => {

    const correctCondition  = Joi.object({
        activeCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
        nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        nextCardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).required()
       
    });
    try {
        await correctCondition.validateAsync(req.body, 
            { 
                abortEarly: false
               
            }
        );
        next();
    } catch (error){
        const errorMessages = new Error(error as string).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessages);
        next(customError);
    }
};
export const boardValidation = { createNew, update, moveCardToDifferentColumn };