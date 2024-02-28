import { GET_DB } from "@/config/mongodb";
import { CardType } from "@/types/cardType";
import { ColumnType } from "@/types/columnType";


import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
import Joi from 'joi';
import { InsertOneResult, ObjectId, UpdateFilter } from "mongodb";
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns';
const COLUMN_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
});
const validateBeforeCreate = async(data: ColumnType): Promise<ColumnType> => {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false }) as ColumnType;
};
const createNew = async(data: ColumnType): Promise<InsertOneResult<Document>> => {
    try {
        const validData = await validateBeforeCreate(data);
        const newColumnToAdd = {
            ...validData,
            boardId: new ObjectId(validData.boardId) // boardId is string, we need to convert it to ObjectId
        };
        const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumnToAdd);
       
        return createdColumn;
    } catch (err: unknown){
        throw new Error(err as string);
    }
};
const findOneById = async(id: ObjectId): Promise<ColumnType> => {
    try {
        const board = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({ _id: id });
    
        return board as ColumnType;
    } catch (err: unknown){
        throw new Error(err as string);
    }

};
const pushCardOrderIds = async(card: CardType): Promise<ColumnType> => {
    try {
        const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(card.columnId) },
            { $push: { cardOrderIds : new ObjectId(card._id) } as UpdateFilter<Document> }, {
                returnDocument: 'after'
            }
    
        );
        return result as ColumnType;
    } catch (err: unknown){
        throw new Error(err as string);
    
    }
};
export const columnModel = {
    COLUMN_COLLECTION_NAME,
    COLUMN_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    pushCardOrderIds
};