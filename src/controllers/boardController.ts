/* eslint-disable @typescript-eslint/no-unsafe-call */
import  { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

import { boardService } from '@/services/boardService';
import { IBoard } from '@/types/boardType';
import { ObjectId } from 'mongodb';
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

const getDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const boardId = req.params.id;
        //navigate to boardService
        const board = await boardService.getDetails(boardId.toString());
        //return the created board to the client
        res.status(StatusCodes.OK).json(board);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const boardId = req.params.id;
        //navigate to boardService
        const updatedBoard = await boardService.update(boardId.toString(), req.body as Request);
        //return the created board to the client
        res.status(StatusCodes.OK).json(updatedBoard);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const boardController = { createNew, getDetails, update };