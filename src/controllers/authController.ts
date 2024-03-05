/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authService } from '@/services/authService';
import { IAccountType } from '@/types/accountType';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";


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
        //navigate to boardService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await authService.refreshToken(req, res);
        // if (dataRes){
        //     //return the created board to the client
        //     res.status(StatusCodes.OK).json(dataRes);
        // }
        res.status(StatusCodes.OK).json({ message:'Refresh token successfully' });
       
        
    } catch (error: unknown){
        //if use next(error) it will go to errorHandler
        next(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Internal Server Error' });
    }
};
export const authController = {
    createNew
    , login,
    refreshToken
};