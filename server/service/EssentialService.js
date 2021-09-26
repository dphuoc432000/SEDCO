const Essential = require("../models/Essential");
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');

class EssentialService {

    addEssentials = async (object) =>{
        const essential = new Essential(object);
        return await essential.save()
            .then( data => data)
            .catch(err => err);
    }

    getAllEssential = async () =>{
        return await Essential.find({})
            .then(essentials => multiplemongooseToObject(essentials))
            .catch(err => err);
    }
}

module.exports = new EssentialService();