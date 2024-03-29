const Car = require('../models/Car');
const {mongooseToObject, multiplemongooseToObject} = require('../util/mongoose');

class CarService {

    addCar = async(user_id, object) =>{
        object.user_id = user_id;
        // console.log("car_id: ", object)
        const car = new Car(object);
        const carSave =  await car.save()
            .then(data => mongooseToObject(data))
            .catch(err => err);
        // console.log(carSave)
        return carSave;
    }
    
    getCarByUserID = async(user_id) =>{
        return await Car.findOne({user_id:user_id})
            .then(data => mongooseToObject(data))
            .catch(err=> err);
    }
    
    getCarbyID = async(id_param) =>{
        return await Car.findById({_id: id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    updateCarById = async(id, object) =>{
       
        //trả về dữ liệu củ
        await Car.findByIdAndUpdate({_id: id}, object)
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //trả về dữ liệu mới
        return await this.getCarbyID(id)
            .then(data => data)
            .catch(err => err);
    }

    updateCarByUserID = async(user_id, object) =>{
        //trả về dữ liệu cuũ
        await Car.findOneAndUpdate({user_id: user_id}, object)
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //trả về dữ liệu mới
        return await this.getCarByUserID(user_id)
            .then(data => data)
            .catch(err => err);
    }
}

module.exports = new CarService();