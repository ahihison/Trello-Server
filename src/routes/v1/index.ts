import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';
const Router = express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ status: 'OK', code: StatusCodes.OK });
});
// Board APIs
Router.use('/board', boardRoutes);
export const API_V1 = Router;