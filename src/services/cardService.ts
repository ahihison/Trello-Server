import { cardModel } from "@/models/cardModel";
import { columnModel } from "@/models/columnModel";

import { CardType } from "@/types/cardType";


const createNew =  async (reqBody: CardType): Promise<CardType|null> => {
    try {
    
        const newCard = {
            ...reqBody
           
        };
        const createdCard = await cardModel.createNew(newCard);
        const getNewCard = await cardModel.findOneById(createdCard.insertedId);
        if (getNewCard){
            //update cardOrderIds in column
            await columnModel.pushCardOrderIds(getNewCard);
        
        }
        return getNewCard;
    } catch (error: unknown) {
        throw new Error(error as string);
  
    }
};





export const cardService = { createNew };