'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
    _dotenv2.default.load();
}

_mongoose2.default.Promise = global.Promise;

var connectToDb = function connectToDb() {
    var dbHost = process.env.MONGODB_URI;
    var testDb = process.env.TEST_MONGODB_URI;

    try {
        if (process.env.NODE_ENV == "test") {
            _mongoose2.default.connect('mongodb://' + testDb);
            console.log('Connected to test db!!!');
        } else {
            _mongoose2.default.connect('mongodb://' + dbHost);
            console.log('Connected to mongo!!!');
        }
    } catch (err) {
        console.log('Could not connect to MongoDB');
    }
};

exports.default = connectToDb;