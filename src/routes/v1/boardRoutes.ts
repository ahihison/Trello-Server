import express from 'express';
import { StatusCodes } from 'http-status-codes';
const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ status: 'GET: API List Board' });
    })
    .post((req, res) => {
        res.status(StatusCodes.CREATED).json({ status: 'POST: API Create Board' });
    });

export const boardRoutes = Router;