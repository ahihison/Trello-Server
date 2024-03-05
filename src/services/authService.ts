/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authModel } from "@/models/authModel";
import { IAccountType } from "@/types/accountType";
import { generateReFressToken, generateToken } from "@/utils/generateToken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
const createNew = async (req: Request): Promise<IAccountType> => {
    try {
     
        const inforUser = req.body as IAccountType;
        //check exist email 
        const isExistEmail = await authModel.checkUserExist(inforUser.email);
        if (isExistEmail){
            throw new Error('Email is already exist');
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds) ;
        const hashedPassword = await bcrypt.hash(inforUser.password, salt);
        const newAccount = {
            userName: inforUser.userName,
            email: inforUser.email,
            password: hashedPassword
        };
        //navigate to authModel
        const createNewAccount = await authModel.createNew(newAccount as IAccountType);
        const getNewAccount = await authModel.findOneById(createNewAccount.insertedId);
        //return the created board to the client
        return getNewAccount;
    } catch (error: unknown){
        throw new Error(error as string);
    }
};
const login = async (req: Request, res: Response): Promise<IAccountType> => {
    try {
     
        const inforUser = req.body as IAccountType;
        
        const user = await authModel.checkUserExist(inforUser.email);
        if (!user) throw new Error('Email is not exist');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     
        const validPassword = await bcrypt.compare( inforUser.password, user.password );
    
        if (!validPassword) throw new Error('Password is not correct');
        let dataRes = {};
        if (user && validPassword){
            const accessToken = generateToken(user);
            const refreshToken = generateReFressToken(user);
            const { password, ...userWithoutPassword } = user;
            dataRes = { user:userWithoutPassword, accessToken };
            authModel.createNewRefreshToken(user._id, refreshToken, new Date(Date.now() + 30 * 86400000));
            //set access token to cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
        }
      
        return dataRes as IAccountType;
       
    } catch (error: unknown){
        throw new Error(error as string);
    }
};
export const refreshToken  = async(req: Request, res: Response): Promise<void> => {
    try {
        
       
        console.log(req.cookies);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error('No token');
        const data = await authModel.checkUserExistByRefreshToken(refreshToken as string);
        console.log('🚀 ~ refreshToken ~ data:', data);
        // if (!user) throw new Error('No token');
        // const accessToken = generateToken(user);
        // const refreshTokenNew = generateReFressToken(user);
        // const { password, ...userWithoutPassword } = user;
        // const dataRes = { user: userWithoutPassword, accessToken };
        // //set access token to cookie
        // res.cookie("refreshToken", refreshTokenNew, {
        //     httpOnly: true,
        //     secure: false,
        //     path: "/",
        //     sameSite: "strict"
        // });
        // return dataRes as IAccountType;
    } catch (error: unknown){
        throw new Error(error as string);
    }
};
export const authService = {
    createNew, login, refreshToken
};