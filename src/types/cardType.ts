import { WithId } from "mongodb";

export interface CardType extends WithId<Document> {
 
   memberIds: string[];
   comments: string[];
    title: string;
    description: string;
    columnId: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
     _destroy: boolean;
}