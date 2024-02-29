import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
const createNew = async(req: Request, res: Response, next: NextFunction): Promise <void> => {
    const correctCondition  = Joi.object({
        boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title:Joi.string().required().min(3).max(50).trim().strict()
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
        // boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title:Joi.string().min(3).max(50).trim().strict(),
        cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
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
export const columnValidation = { createNew, update };