/* eslint-disable require-await */
import exitHook from 'async-exit-hook';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb';
import { API_V1 } from "./routes/v1/index";
import { API_V2 } from "./routes/v2/index";
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { corsOptions } from './config/cors';
import cookieParser from 'cookie-parser';
const hostname = 'localhost';
const port = 8017;


const START_SERVER = () => {
    //enable request body json
    const app = express();
    //enable cors
    
    app.use(cors(corsOptions));
  
    app.use(cookieParser());
    app.use(express.json());
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
    app.use('/v1', API_V1);
    app.use('/v2', API_V2);
    app.use(errorHandlingMiddleware);
    if (process.env.BUILD_MODE === 'production'){
        app.listen(process.env.PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Hello Sown Dev, I am running at prodcution ${ process.env.PORT}/`);
    
        });
    } else {
        app.listen(port, hostname, () => {
            // eslint-disable-next-line no-console
            console.log(`Local Dev Hello Sown Dev, I am running at ${ hostname }:${ port }/`);
    
        });
    }
   
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


