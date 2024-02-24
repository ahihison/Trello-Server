import { columnModel } from "@/models/columnModel";
import { ColumnType } from "@/types/columnType";



const createNew =  async (reqBody: ColumnType): Promise<ColumnType|null> => {
    try {
    
        const newColumn = {
            ...reqBody
        };
        const createdColumn = await columnModel.createNew(newColumn);
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);
        
        return getNewColumn;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};





export const columnService = { createNew };