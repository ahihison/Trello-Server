import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoute } from './boardRoute';
import { cardRoute } from './cardRoute';
import { columnRoute } from './columnRoute';
import { authRoute } from './authRoute';
const Router = express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ status: 'OK', code: StatusCodes.OK });
});
// Board APIs
Router.use('/boards', boardRoute);
// Card APIs
Router.use('/cards', cardRoute);
// Column APIs
Router.use('/columns', columnRoute);
//Auth
Router.use('/register', authRoute);
export const API_V1 = Router;