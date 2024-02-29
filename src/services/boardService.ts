
import { boardModel } from "@/models/boardModel";
import { cardModel } from "@/models/cardModel";
import { columnModel } from "@/models/columnModel";
import { IBoard, ICard, IColumn, IMoveCardToDifferentColumn } from "@/types/boardType";
import ApiError from "@/utils/ApiError";
import { slugify } from "@/utils/formetter";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
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
const update =  async (boardId: string, reqBody: Request): Promise<IBoard|null> => {
    try {
        const updateData = {
            ...reqBody,
            updatedAt: Date.now()
        };
        const updatedBoard = await boardModel.update(boardId, updateData as unknown as IBoard);
      
        
        return updatedBoard ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};

const moveCardToDifferentColumn =  async (reqBody: IMoveCardToDifferentColumn): Promise<object|null> => {
    try {
       
      
        //check if the card is in the same column
        if (reqBody?.prevColumnId === reqBody?.nextColumnId){
            return { updateResult:"successfully" } ;
        }
        //update arr cardOrderIds in the first column has card
        await columnModel.update(reqBody?.prevColumnId, {
            cardOrderIds: reqBody.prevCardOrderIds,
            updatedAt: Date.now()
        });
        //update arr cardOrderIds in the second column
        await columnModel.update(reqBody?.nextColumnId, {
            cardOrderIds: reqBody.nextCardOrderIds,
            updatedAt: Date.now()
        });
        //update columnId of the card
        await cardModel.update(reqBody?.activeCardId, {
            columnId: new ObjectId(reqBody?.nextColumnId),
            updatedAt: Date.now()
        });
        return { updateResult:"successfully" } ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};

export const boardService = { createNew, getDetails, update, moveCardToDifferentColumn };