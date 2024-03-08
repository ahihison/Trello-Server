import { GET_DB } from "@/config/mongodb";
import { IAccountType, IGoogleAccount } from "@/types/accountType";
import { USER_ROLE } from "@/utils/constants";
import { HASH_PASSWORD_RULE, HASH_PASSWORD_RULE_MESSAGE } from '@/utils/validators';
import Joi from "joi";
import { AggregationCursor, Document, InsertOneResult, ObjectId } from "mongodb";

const ACCOUNT_CONLECTION_NAME = "accounts";
const TOKEN_CONLECTION_NAME = "tokens";
const ACCOUNT_CONLECTION_SCHEMA = Joi.object({
    userName: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().required().email().trim().strict(),
    password: Joi.string().required().pattern(HASH_PASSWORD_RULE).message(HASH_PASSWORD_RULE_MESSAGE),
    role: Joi.string().default(USER_ROLE.USER).valid(USER_ROLE.USER, USER_ROLE.ADMIN),
    avatar: Joi.string().default('https://www.gravatar.com/avatar').trim().strict(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
});
const validateBeforeCreate = async(data: IAccountType): Promise<IAccountType> => {
    return await ACCOUNT_CONLECTION_SCHEMA.validateAsync(data, { abortEarly: false }) as IAccountType;
};
const createNew = async(data: IAccountType): Promise<InsertOneResult<Document>> => {
    try {
        const validData = await validateBeforeCreate(data);
        const createdAccount = await GET_DB().collection(ACCOUNT_CONLECTION_NAME).insertOne(validData);
        
        return createdAccount;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const createNewWithGoogle = async(data: IGoogleAccount): Promise<InsertOneResult<Document>> => {
    try {
        const validData = {
            userName: data.name,
            email: data.email,
            password: '',
            role: USER_ROLE.USER,
            avatar: data.picture,
            createdAt: Date.now(),
            updatedAt: null,
            _destroy: false
        };
        const createdAccount = await GET_DB().collection(ACCOUNT_CONLECTION_NAME).insertOne(validData);
        
        return createdAccount;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const checkUserExist = async(email: string): Promise<IAccountType> => {
    try {
        const user = await GET_DB().collection(ACCOUNT_CONLECTION_NAME).findOne({ email });
        return user as unknown as IAccountType;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const findOneById = async(id: ObjectId): Promise<IAccountType> => {
    try {
        const user = await GET_DB().collection(ACCOUNT_CONLECTION_NAME).findOne({ _id: id });
        return user as unknown as IAccountType;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const createNewRefreshToken = async(userId: ObjectId, refreshToken: string, expiryDate: Date): Promise<InsertOneResult> => {
    try {
        // const validData = await validateBeforeCreate(data);
        const createdAccount = await GET_DB().collection(TOKEN_CONLECTION_NAME).insertOne({
            userId,
            refreshToken,
            expiryDate
        });
        
        return createdAccount;
    } catch (err: unknown){
        throw new Error(err as string);
    
    }
};
const checkUserExistByRefreshToken = async(refreshToken: string): Promise<Document[]> => {
    try {
        const user = await GET_DB().collection(TOKEN_CONLECTION_NAME).aggregate([
            { $match: { refreshToken } },
            { $lookup: {
                from: ACCOUNT_CONLECTION_NAME,
                localField: 'userId',
                foreignField: '_id',
                as: 'accounts'
            } }
        ]).toArray();
        
        return user;
    } catch (err: unknown){
        throw new Error(err as string);
    }
    
};
const updateRefreshToken = async(newRefreshToken: string, userId: ObjectId): Promise<Document> => {
    console.log('🚀 ~ updateRefreshToken ~ newRefreshToken:', newRefreshToken, userId);
    try {
        
        const user = await GET_DB().collection(TOKEN_CONLECTION_NAME).findOneAndUpdate(
            { userId:new ObjectId(userId) },
            { $set:{ refreshToken: newRefreshToken } }, {
                returnDocument: 'after'
            }
        
        );
        
        return user as Document;
    } catch (err: unknown){
        throw new Error(err as string);
    }
    
};


export const authModel = {
    createNew,
    checkUserExist,
    findOneById,
    createNewRefreshToken,
    checkUserExistByRefreshToken,
    updateRefreshToken,
    createNewWithGoogle
};