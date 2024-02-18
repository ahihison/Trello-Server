/* eslint-disable @typescript-eslint/no-unsafe-call */
import  { NextFunction, Request, Response } from 'express';
interface Error{
    message: string;

}
import { StatusCodes } from "http-status-codes";

import { boardService } from '@/services/boardService';
import { IBoard } from '@/types/boardType';
const createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate to boardService
        const createdBoard = await boardService.createNew(req.body as IBoard);
        
        //return the created board to the client
        res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const boardController = { createNew };