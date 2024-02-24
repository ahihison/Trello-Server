/* eslint-disable @typescript-eslint/no-unsafe-call */
import  { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

import { cardService } from '@/services/cardService';

import { ObjectId } from 'mongodb';
import { CardType } from '@/types/cardType';
const createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate to boardService
        const createdCard = await cardService.createNew(req.body as CardType);
        
        //return the created board to the client
        res.status(StatusCodes.CREATED).json(createdCard);
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};


export const cardController = { createNew };