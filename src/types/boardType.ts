import { WithId } from "mongodb";
export interface ICard {
    _id: string;
    title: string;
    boardId: string;
  columnId: string;
  // ... other properties
}

export interface IColumn {
  _id: string;
  title: string;
  cardOrderIds: ICard[];
  boardId: string;
  cards: ICard[];
  // ... other properties
}
export interface IBoard extends WithId<Document> {

    title: string;
    type: string;
    slug: string;
    description: string;
    columnOrderIds: string[];
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
   
}
export interface IResBoard extends IBoard {
    [x: string]: any;
    columns: IColumn[];
    cards?: ICard[];

}