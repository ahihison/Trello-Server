import { slugify } from "@/utils/formetter";
interface IreqBody {
    title: string;
    description: string;
}
const createNew =  (reqBody: IreqBody): IreqBody => {
    try {
    
        const newBoard = {
            ...reqBody,
            slug:slugify(reqBody.title)
        };
        
        return newBoard;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};


export const boardService = { createNew };