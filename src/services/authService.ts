import { authModel } from "@/models/authModel";
import { IAccountType } from "@/types/accountType";
import bcrypt from "bcrypt";
import { Request } from "express";
import { InsertOneResult } from "mongodb";
const createNew = async (req: Request): Promise<InsertOneResult<Document>> => {
    try {
        
        const inforUser = req.body as IAccountType;
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
        //return the created board to the client
        return createNewAccount;
    } catch (error: unknown){
        throw new Error(error as string);
    }
};
export const authService = {
    createNew
};