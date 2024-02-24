/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { cardValidation } from '@/validations/cardValidation';
import { cardController } from '@/controllers/cardController';
const Router = express.Router();

Router.route('/')
   
    .post(cardValidation.createNew, cardController.createNew);


export const cardRoute = Router;