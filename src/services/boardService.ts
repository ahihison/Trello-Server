import { slugify } from "@/utils/formetter";
import { IBoard, ICard, IColumn, IResBoard } from "@/types/boardType";
import { boardModel } from "@/models/boardModel";
import ApiError from "@/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { cloneDeep } from "lodash";


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
        // clone board
      
        const resBoard = cloneDeep(board);
      
        //move cards to correct columns
      
        resBoard.columns.forEach((column: IColumn) => {
            if (resBoard.cards){
    
                column.cards = resBoard.cards.filter((card: ICard) => card.columnId.toString() === column._id.toString());
            }
           
        });
        // remove cards from board
      
        delete resBoard.cards;
        
        return resBoard ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};



export const boardService = { createNew, getDetails };