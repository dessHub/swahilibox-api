import Mongoose from 'mongoose';
 import dotenv from 'dotenv';
 
if (process.env.NODE_ENV !== 'production') {
dotenv.load();
}

Mongoose.Promise = global.Promise;

const connectToDb = () => {
    let dbHost = process.env.dbHost;
    let dbPort = process.env.dbPort;
    let dbName = process.env.dbName;
    
    try {
        Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

export default connectToDb;
