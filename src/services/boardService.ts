import { slugify } from "@/utils/formetter";
import { IBoard } from "@/types/boardType";
import { boardModel } from "@/models/boardModel";
import { WithId } from "mongodb";
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


export const boardService = { createNew };