import { authController } from '@/controllers/authController';
import express from 'express';
const Router = express.Router();

Router.route("/login").post(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    authController.loginWithGoogle
);

export const auth2Route = Router;