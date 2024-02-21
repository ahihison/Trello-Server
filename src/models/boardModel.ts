import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
import { IBoard } from "@/types/boardType";
import { GET_DB } from "@/config/mongodb";
import { InsertOneResult, ObjectId } from "mongodb";
const BOARD_CONLECTION_NAME = "boards";
const BOARD_CONLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async(data: IBoard): Promise<IBoard> => {
    return await BOARD_CONLECTION_SCHEMA.validateAsync(data, { abortEarly: false }) as IBoard;
};
const createNew = async(data: IBoard): Promise<InsertOneResult<Document>> => {
    try {
        const validData = await validateBeforeCreate(data);
     
        const createdBoard = await GET_DB().collection(BOARD_CONLECTION_NAME).insertOne(validData);
       
        return createdBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const findOneById = async(id: ObjectId): Promise<IBoard> => {
    try {
        const board = await GET_DB().collection(BOARD_CONLECTION_NAME).findOne({ _id: id });
    
        return board as IBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    }

};
const getDetails = async(id: ObjectId): Promise<IBoard> => {
    try {
        const board = await GET_DB().collection(BOARD_CONLECTION_NAME).findOne({ _id: id });
    
        return board as IBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    }

};
export const boardModel = { 
    BOARD_CONLECTION_NAME, 
    BOARD_CONLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails };