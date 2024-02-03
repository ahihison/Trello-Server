import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const createNew = async(req: Request, res: Response, next: NextFunction): Promise <void> => {
    const correctCondition  = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(256).trim().strict()

    });
    
    try {
        console.log('req.body', req.body);
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        // next();
        res.status(StatusCodes.OK).json({ status: 'POST: API Create New Board from validation' });
    } catch (error){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(error as string).message });
    }
};

export const boardValidation = { createNew };