/* eslint-disable require-await */
import express from 'express';
import { mapOrder } from '../src/utils/sorts';
import { CONNECT_DB, CLOSE_DB } from './config/mongodb';
import exitHook from 'async-exit-hook';
import  'dotenv/config';
import { API_V1 } from "./routes/v1/index";
const app = express();

const hostname = 'localhost';
const port = 8017;

const START_SERVER = () => {
    
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
    app.use('/v1', API_V1);

    app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
        console.log(`Hello Sown Dev, I am running at ${ hostname }:${ port }/`);
    
    });
};

(async () => {
    try {
       
        await CONNECT_DB();
        console.log('Connected to MongoDB successfully!');
        START_SERVER();
    } catch (error){
        console.error('Error connecting to MongoDB: ', error);
        process.exit(0);
    }
})();


exitHook(() => {

    CLOSE_DB();

}); 
    
// CONNECT_DB()

//     .then(() => console.log('Connected to MongoDB successfully!'))
//     .then(() => START_SERVER())
//     .catch(error => {
//         console.error('Error connecting to MongoDB: ', error);
//         process.exit(0);
//     });


