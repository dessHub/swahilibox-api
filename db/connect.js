import Mongoose from 'mongoose';
import config from './config/config.dev'

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { useMongoClient: true });
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

export default connectToDb;
