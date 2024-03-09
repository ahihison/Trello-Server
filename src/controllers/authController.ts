/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authService } from '@/services/authService';
import { IAccountType, IGoogleAccount } from '@/types/accountType';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { OAuth2Client } from 'google-auth-library';
interface IRefreshTokenRes {
    accessToken: string;
    refreshToken: string;
}
const createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate to boardService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      
        const createNewAccount = await authService.createNew(req);
        if (createNewAccount){
            //return the created board to the client
            res.status(StatusCodes.CREATED).json({ message:'Account created successfully'
            });
        }
        
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        //navigate to boardService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      
        const resLogin = await authService.login(req, res);
        if (resLogin){
            //return the created board to the client
            res.status(StatusCodes.OK).json(resLogin);
        }
       
        
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
       
        const result =  await authService.refreshToken(req, res);
        if (result){
            res.cookie("refreshToken", (result as IRefreshTokenRes).refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            res.status(StatusCodes.OK).json({ accessToken:(result as IRefreshTokenRes).accessToken });
        }
       
        
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
const loginWithGoogle = async(req: Request, res: Response, next: NextFunction): Promise<void> => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data = req.body as IGoogleAccount;
    try {
        const dataReq = {
            name: data.name,
            email: data.email,
            picture: data.picture
        };
        const dataRes = await authService.loginWithGoogle(dataReq, res);
    } catch (error: unknown){
        next(error);
    }
  

    
};
export const authController = {
    createNew
    , login,
    refreshToken,
    loginWithGoogle
};