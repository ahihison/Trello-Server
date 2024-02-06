/* eslint-disable @typescript-eslint/no-unsafe-call */
import  { NextFunction, Request, Response } from 'express';
interface Error{
    message: string;

}
import { StatusCodes } from "http-status-codes";
import  ApiError  from "../utils/ApiError";
const createNew = (req: Request, res: Response, next: NextFunction): void => {

    try {
        //
        
        console.log('req.body', req.query);
        console.log('req.body', req.params);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'This is a custom error message');
        // res.status(StatusCodes.OK).json({ status: 'POST: API Create New Board from controller' });
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const boardController = { createNew };