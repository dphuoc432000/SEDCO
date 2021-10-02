const Essential = require("../models/Essential");
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');

class EssentialService {

    addEssentials = async (object) =>{
        const essential =    new Essential(object);
        return await essential.save()
            .then( data => data)
            .catch(err => err);
    }

    getAllEssential = async () =>{
        return await Essential.find({})
            .then(essentials => multiplemongooseToObject(essentials))
            .catch(err => err);
    }

    deleteEssential = async (essential_id) =>{
        return await Essential.findByIdAndRemove({_id: essential_id})
            .then(data => mongooseToObject(data))
            .catch(err =>err);
    }    

    updateEssential = async (essential_id, object) =>{
        return await Essential.findByIdAndUpdate({_id: essential_id}, object)
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    getEssentialDetail = async (essential_id)=>{
        return await Essential.findById({_id: essential_id})
            .then (data => data)
            .catch(err => err)
    }
}

module.exports = new EssentialService();