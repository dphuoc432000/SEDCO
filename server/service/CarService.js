const Car = require('../models/Car');
const {mongooseToObject, multiplemongooseToObject} = require('../util/mongoose');

class CarService {

    addCar = async(user_id, object) =>{
        object.user_id = user_id;
        console.log("car_id: ", object)
        const car = new Car(object);
        return await car.save()
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }
    
    getCarByUserID = async(user_id) =>{
        return await Car.findOne({user_id:user_id})
            .then(data => mongooseToObject(data))
            .catch(err=> err);
    }
    
    getCarbyID = async(id_param) =>{
        return await Car.findById({_id:id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }
}

module.exports = new CarService();