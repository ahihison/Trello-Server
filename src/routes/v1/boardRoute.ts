/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { boardValidation } from '@/validations/boardValidation';
import { boardController } from '@/controllers/boardController';
const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ status: 'GET: API List Board' });
    })
    .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')
    .get(boardController.getDetails)
    .put(boardValidation.update, boardController.update);// update

// API support move different column
Router.route('/supports/moving_card')
    .put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn);
export const boardRoute = Router;