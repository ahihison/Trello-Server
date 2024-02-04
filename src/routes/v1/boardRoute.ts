/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '@/validations/boardValidation';
import { boardController } from '@/controllers/boardController';
const Router = express.Router();

Router.route('/:id')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ status: 'GET: API List Board' });
    })
    .post(boardValidation.createNew, boardController.createNew);

export const boardRoute = Router;