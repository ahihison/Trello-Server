/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { boardValidation } from '@/validations/boardValidation';
import { boardController } from '@/controllers/boardController';
import verifyTokenMiddleware from '@/middlewares/verifyTokenMiddleware';
const Router = express.Router();

Router.route('/')
    .get((req, res) => {
       
        
        res.status(StatusCodes.OK).json({ status: 'GET: API List Board' });
    })
    .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')

    .get(verifyTokenMiddleware.verifyToken, boardController.getDetails)
    .put(verifyTokenMiddleware.verifyToken, boardValidation.update, boardController.update);// update

// API support move different column
Router.route('/supports/moving_card')
    .put(verifyTokenMiddleware.verifyToken, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn);
export const boardRoute = Router;