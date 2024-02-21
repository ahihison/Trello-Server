import { slugify } from "@/utils/formetter";
import { IBoard } from "@/types/boardType";
import { boardModel } from "@/models/boardModel";
import ApiError from "@/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";

const createNew =  async (reqBody: IBoard): Promise<IBoard|null> => {
    try {
    
        const newBoard = {
            ...reqBody,
            slug:slugify(reqBody.title)
        };
        const createdBoard = await boardModel.createNew(newBoard);
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);  
        
        return getNewBoard;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};

const getDetails =  async (boardId: string): Promise<IBoard|null> => {
    try {
    
        const board = await boardModel.getDetails(new ObjectId(boardId));
        if (!board){
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
        }
        return board ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};



export const boardService = { createNew, getDetails };