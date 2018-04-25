
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

   //dotenv.load();
 

/*let url = process.env.dbHost;

module.exports = {

    'url' : 'mongodb://${url}' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/<dbname>
    //'url' : 'mongodb://root:space28.@ds149309.mlab.com:49309/spaceapi'
}; */

Mongoose.Promise = global.Promise;

const connectToDb = () => {
    let dbHost = process.env.dbHost;
    
    try {
        Mongoose.connect(`mongodb://${dbHost}`);
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

module.exports = connectToDb;