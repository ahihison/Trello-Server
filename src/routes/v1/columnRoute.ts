/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import express from 'express';

import { columnController } from '@/controllers/columnController';
import { columnValidation } from '@/validations/columnValidation';
import verifyTokenMiddleware from '@/middlewares/verifyTokenMiddleware';
const Router = express.Router();

Router.route('/')
    .post(verifyTokenMiddleware.verifyToken, columnValidation.createNew, columnController.createNew);

Router.route('/:id')
    .put(verifyTokenMiddleware.verifyToken, columnValidation.update, columnController.update)
    .delete(verifyTokenMiddleware.verifyTokenAdmin, columnValidation.deleteItem, columnController.deleteItem);
export const columnRoute = Router;