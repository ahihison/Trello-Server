import { WithId } from "mongodb";

export interface IBoard extends WithId<Document> {
    
    title: string;
    slug: string;
    description: string;
    columnOrderIds: string[];
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
}