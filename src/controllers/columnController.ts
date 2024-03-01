/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

import { columnService } from '@/services/columnService';
import { ColumnType } from '@/types/columnType';
import { boardService } from '@/services/boardService';

const createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate tocolumnService
        const createdColumn = await columnService.createNew(req.body as ColumnType);
        
        //return the createdcolumn to the client
        res.status(StatusCodes.CREATED).json(createdColumn);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const columnId = req.params.id;
        
        //navigate to boardService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const updatedColumn = await columnService.update(columnId.toString(), req.body);
        //return the created board to the client
        res.status(StatusCodes.OK).json(updatedColumn);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
const deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const columnId = req.params.id;
        
        //navigate to boardService
        
        const result = await columnService.deleteItem(columnId.toString());
        //return the created board to the client
        res.status(StatusCodes.OK).json(result);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const columnController = { createNew, update, deleteItem };