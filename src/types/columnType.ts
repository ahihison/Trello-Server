import { ObjectId, WithId } from "mongodb";

export interface ColumnType extends WithId<Document> {

    title: string;
    cardOrderIds: ObjectId[];
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
}