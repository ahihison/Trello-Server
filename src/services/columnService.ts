import { columnModel } from "@/models/columnModel";
import { ColumnType } from "@/types/columnType";
import { boardModel } from "@/models/boardModel";
import { ObjectId } from "mongodb";


const createNew =  async (reqBody: ColumnType): Promise<ColumnType|null> => {
    try {
    
        const newColumn = {
            ...reqBody
        };
        const createdColumn = await columnModel.createNew(newColumn);
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);
        if (getNewColumn){
            getNewColumn.cards = [];
            //update columnOrderIds in board
            await boardModel.pushColumnOrderIds(getNewColumn);
        }
        return getNewColumn;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};


const update =  async (columnId: string, reqBody: ColumnType): Promise<ColumnType|null> => {
    try {
        
        const updateData = {
            ...reqBody,
            updatedAt: Date.now()
        };
        
      
        const updatedColumn = await columnModel.update( columnId, updateData as unknown as ColumnType);
      
        
        return updatedColumn ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};


export const columnService = { createNew, update };