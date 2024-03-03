import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators';
import { IBoard, IResBoard } from "@/types/boardType";
import { GET_DB } from "@/config/mongodb";
import { InsertOneResult, ObjectId, UpdateFilter } from "mongodb";
import { BOARD_TYPES } from "@/utils/constants";
import { columnModel } from "./columnModel";
import { cardModel } from "./cardModel";
import { ColumnType } from "@/types/columnType";
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];
const BOARD_CONLECTION_NAME = "boards";

const BOARD_CONLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
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
const getDetails = async(id: ObjectId): Promise<IResBoard> => {
    try {
        // const board = await GET_DB().collection(BOARD_CONLECTION_NAME).findOne({ _id: id });
        const result = await GET_DB().collection(BOARD_CONLECTION_NAME).aggregate([
            { $match: { 
                _id: id,
                _destroy: false
            } },
            
            { $lookup: {
                from:columnModel.COLUMN_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'columns'

            } },
            { $lookup: {
                from:cardModel.CARD_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'cards'

            } }
        ]).toArray();
    
        return result[0] as IResBoard || null;
    } catch (err: unknown){
        throw new Error(err as string);
    }

};
const pushColumnOrderIds = async(column: ColumnType): Promise<IBoard> => {
    try {
        const result = await GET_DB().collection(BOARD_CONLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(column.boardId) },
            { $push: { columnOrderIds: new ObjectId(column._id) } as UpdateFilter<Document> }, {
                returnDocument: 'after'
            }
    
        );
        return result as IBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    
    }
};
const pullColumnOrderIds = async(column: ColumnType): Promise<IBoard> => {
    try {
        const result = await GET_DB().collection(BOARD_CONLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(column.boardId) },
            { $pull: { columnOrderIds: new ObjectId(column._id) } as UpdateFilter<Document> }, {
                returnDocument: 'after'
            }
    
        );
        return result as IBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    
    }
};
const update = async(boardId: string, updateData: IBoard): Promise<IBoard> => {
    try {
        Object.keys(updateData).forEach((key) => {
            if (INVALID_UPDATE_FIELDS.includes(key)){
                delete updateData[key as keyof typeof updateData];
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (updateData.columnOrderIds){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
            updateData.columnOrderIds = updateData.columnOrderIds.map((_id: any) => new ObjectId(_id));
        }
        const result = await GET_DB().collection(BOARD_CONLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(boardId) },
            { $set: updateData }, {
                returnDocument: 'after'
            }
    
        );
        return result as IBoard;
    } catch (err: unknown){
        throw new Error(err as string);
    
    }
};
export const boardModel = { 
    BOARD_CONLECTION_NAME, 
    BOARD_CONLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails,
    pushColumnOrderIds,
    update,
    pullColumnOrderIds };