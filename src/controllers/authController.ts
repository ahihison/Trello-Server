/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authService } from '@/services/authService';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";


const createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate to boardService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const createNewAccount = await authService.createNew(req);
        
        //return the created board to the client
        res.status(StatusCodes.CREATED).json(createNewAccount);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};

export const authController = {
    createNew
};