import  { NextFunction, Request, Response } from 'express';
interface Error{
    message: string;

}
import { StatusCodes } from "http-status-codes";
const createNew = (req: Request, res: Response, next: NextFunction): void => {

    try {
        //
        
        console.log('req.body', req.query);
        console.log('req.body', req.params);
        res.status(StatusCodes.OK).json({ status: 'POST: API Create New Board from controller' });
    } catch (error: unknown){

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const boardController = { createNew };