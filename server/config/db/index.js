const mongoose = require('mongoose');
const config = require('../config.js');

async function connect(){
    try {
        await mongoose.connect(config.mongodb_uri,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log('Connected Successfull!!!')
    } catch (error) {
        console.log('Connected FAILURE!!!')
    }
}

module.exports = {connect};