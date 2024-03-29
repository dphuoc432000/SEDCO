'use strict'
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const{
    PORT,
    HOST,
    HOST_URL,
    MONGODB_URI,
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

module.exports ={
    port: PORT,
    host: HOST,
    url: HOST_URL,
    mongodb_uri: MONGODB_URI,
}