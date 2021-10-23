const Vehicle_censorship = require('../models/Vehicle_Censorship');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const Car_status = require('../models/Car_Status');
const carStatusSevice = require('./CarStatusService');
const carService = require('./CarService');
const userService = require('./UserService');

class VehicleCensorshipService {

    addVehicleCensorship = async (user_id, object) =>{
        object.user_id = user_id;
        const vehicle_censorship = new Vehicle_censorship(object);
        return await vehicle_censorship.save()
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    getAllVehicleCensorship = async () => {
        return await Vehicle_censorship.find({})
            .then(data => data)
            .catch(err => err)
    }

    getVehicleCensorshipById = async (id_param) =>{
        return await Vehicle_censorship.findById({_id: id_param})
            .then(data => data)
            .catch(err => err);
    }

    getVehicleCensorshipByUserId = async (user_id_param) =>{
        return await Vehicle_censorship.findOne({user_id: user_id_param})
            .then(data => data)
            .catch(err => err);
    }


}

module.exports = new VehicleCensorshipService();