import { GET_DB } from "@/config/mongodb";
import { IAccountType } from "@/types/accountType";
import { BOARD_TYPES, USER_ROLE } from "@/utils/constants";
import { HASH_PASSWORD_RULE, HASH_PASSWORD_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
import Joi from "joi";
import { Document, InsertOneResult } from "mongodb";
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];
const ACCOUNT_CONLECTION_NAME = "accounts";

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
        console.log('🚀 ~ createNew ~ createdAccount:', createdAccount);
        
        return createdAccount;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};

export const authModel = {
    createNew
};