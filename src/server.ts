/* eslint-disable require-await */
import express from 'express';
import { mapOrder } from '../src/utils/sorts';
import { CONNECT_DB, CLOSE_DB } from './config/mongodb';
import exitHook from 'async-exit-hook';
import  'dotenv/config';

const app = express();

const hostname = 'localhost';
const port = 8017;

const START_SERVER = () => {
    
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
    app.get('/', async (req, res)  => {

        console.log(mapOrder(
            [ { id: 'id-1', name: 'One' },
                { id: 'id-2', name: 'Two' },
                { id: 'id-3', name: 'Three' },
                { id: 'id-4', name: 'Four' },
                { id: 'id-5', name: 'Five' } ],
            ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
            'id'
        ));
        res.end('<h1>Hello World!</h1><hr>');
    });

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


