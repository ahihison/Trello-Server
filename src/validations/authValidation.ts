import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
const createNew = async(req: Request, res: Response, next: NextFunction): Promise <void> => {
    const correctCondition  = Joi.object({
        userName: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'UserName is required',
            'string.empty': 'UserName must not be empty',
            'string.min': 'UserName must have at least 3 characters',
            'string.max': 'UserName must have at most 50 characters',
            'string.trim': 'UserName must not have white spaces'
        }),
        email: Joi.string().required().email().trim().strict().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email must not be empty',
            'string.email': 'Email must be a valid email',
            'string.trim': 'Email must not have white spaces'
        
        }),
        password: Joi.string().required().min(6).max(50).trim().strict()
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

const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const correctCondition  = Joi.object({
            email:Joi.string().required().email().trim().strict(),
            password:Joi.string().required().min(6).max(50).trim().strict()
        });
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error: unknown){
        const errorMessages = new Error(error as string).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessages);
        next(customError);
    }
};
export const authValidation = {
    createNew
    , login
};