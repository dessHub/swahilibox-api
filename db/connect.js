import Mongoose from 'mongoose';
 import dotenv from 'dotenv';
 
if (process.env.NODE_ENV !== 'production') {
dotenv.load();
}

Mongoose.Promise = global.Promise;

const connectToDb = () => {
    let dbHost = process.env.MONGODB_URI;
    
    try {
        Mongoose.connect(`mongodb://${dbHost}`);
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

export default connectToDb;
