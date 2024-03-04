/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import { authController } from '@/controllers/authController';
import { authValidation } from '@/validations/authValidation';
import express from 'express';

const Router = express.Router();

Router.route('/register')
    .post(authValidation.createNew, authController.createNew);



Router.route('/login')
    .post(authValidation.login, authController.login);

// Router.route('/refresh')
//     .post(authValidation.refresh, authController.refresh);

// Router.route('/logout')
//     .post(authValidation.logout, authController.logout);



export const authRoute = Router;