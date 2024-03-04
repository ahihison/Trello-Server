import { ObjectId } from "mongodb";

export interface IAccountType{
    _id: ObjectId;
    userName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
}