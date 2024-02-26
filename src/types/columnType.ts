import { ObjectId, WithId } from "mongodb";
import { CardType } from "./cardType";

export interface ColumnType extends WithId<Document> {

    title: string;
    cardOrderIds: ObjectId [];
    cards: CardType[];
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
}