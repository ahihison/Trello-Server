import { columnModel } from "@/models/columnModel";
import { ColumnType } from "@/types/columnType";
import { boardModel } from "@/models/boardModel";
import { ObjectId } from "mongodb";
import { cardModel } from "@/models/cardModel";
import ApiError from "@/utils/ApiError";


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
const deleteItem =  async (columnId: string): Promise<object> => {
    try {
        const targetColumn = await columnModel.findOneById(new ObjectId (columnId));
        if (!targetColumn){
            throw new ApiError(404, "Column not found");
        }
        //delete Column
        await columnModel.deleteOneById(new ObjectId (columnId));
        //delete all Card of this column
        await cardModel.deleteManyByColumnId(new ObjectId (columnId));

        //delete columnorderIds in board
        await boardModel.pullColumnOrderIds(targetColumn);
        return { deleteResult:"Column and its Cards deleted successfully" } ;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};

export const columnService = { createNew, update, deleteItem };