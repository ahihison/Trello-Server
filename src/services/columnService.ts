import { columnModel } from "@/models/columnModel";
import { ColumnType } from "@/types/columnType";
import { boardModel } from "@/models/boardModel";


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





export const columnService = { createNew };