
import { MongoClient, ServerApiVersion } from "mongodb";
import { Db } from 'mongodb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MOONGOSE_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
let trelloDatabaseInstance: Db | null = null;
export const CONNECT_DB = async(): Promise <void> => {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    trelloDatabaseInstance = client.db("Trello-Server");


};
export const GET_DB = (): Db => {
    if (!trelloDatabaseInstance) throw new Error("Must connect to database before getting it");
    return trelloDatabaseInstance;
};
export const CLOSE_DB = async(): Promise <void> => {
  
    await client.close();
 
};
