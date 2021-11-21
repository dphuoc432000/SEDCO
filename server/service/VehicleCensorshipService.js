const Vehicle_censorship = require('../models/Vehicle_Censorship');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const Car_status = require('../models/Car_Status');
const carStatusSevice = require('./CarStatusService');
const carService = require('./CarService');
const userService = require('./UserService');
const fs = require('fs');
const path = require('path');

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
            .then(data => mongooseToObject(data))
            .catch(err => err)
    }

    getVehicleCensorshipById = async (id_param) =>{
        return await Vehicle_censorship.findById({_id: id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    getVehicleCensorshipByUserId = async (user_id_param) =>{
        return await Vehicle_censorship.findOne({user_id: user_id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }


    updateVehicleCensorshipByUserIDForUserInfor = async (user_id_param, object) =>{
        console.log('object', object)
        //xóa dhinhf cũ update hình mới
        const images = await this.getVehicleCensorshipByUserId(user_id_param)
            .then(data => {
                return {
                    face_img: object.face_img?data.face_img:'',
                    id_card_img_before: object.id_card_img_before?data.id_card_img_before:'',
                    id_card_img_after: object.id_card_img_after?data.id_card_img_after:'',
                    driving_license_img_before: object.driving_license_img_before?data.driving_license_img_before:'',
                    driving_license_img_after: object.driving_license_img_after?data.driving_license_img_after:'',
                    test_img_1: object.test_img_1?data.test_img_1:'',
                    test_img_2: object.test_img_2?data.test_img_2:'',
                }
            })
            .catch(err => null);
            console.log(images)
        if(images)
            for (const [key, value] of Object.entries(images)) {
                if(key)
                    if(value)
                        fs.unlink(path.join('..\\server', value), (err) => {
                            if (err) {
                                console.log(err);
                                return ;
                            }
                        });
            }
            //lọc imgae nào được update nào không được
        const Vehicle_censorship_update = await this.getVehicleCensorshipByUserId(user_id_param)
            .then(data => {
                // console
                return {
                    face_img: object.face_img?object.face_img:data.face_img,
                    id_card_img_before: object.id_card_img_before?object.id_card_img_before:data.id_card_img_before,
                    id_card_img_after: object.id_card_img_after?object.id_card_img_after:data.id_card_img_after,
                    driving_license_img_before: object.driving_license_img_before?object.driving_license_img_before:data.driving_license_img_before,
                    driving_license_img_after: object.driving_license_img_after?object.driving_license_img_after:data.driving_license_img_after,
                    test_img_1: object.test_img_1?object.test_img_1:data.test_img_1,
                    test_img_2: object.test_img_2?object.test_img_2:data.test_img_2,
                }
            })
            .catch(err => null);
            console.log(Vehicle_censorship_update)
        //trả về dữ liệu cũ 
        await Vehicle_censorship.findOneAndUpdate({user_id: user_id_param}, Vehicle_censorship_update)
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //trả về dữ liệu mới
        return await this.getVehicleCensorshipByUserId(user_id_param)
            .then(data => data)
            .catch(err => err);
    }

    updateVehicleCensorshipByUserID = async (user_id_param, object) =>{
        
        //xóa dhinhf cũ update hình mới
        const images = await this.getVehicleCensorshipByUserId(user_id_param)
            .then(data => {
                return {
                    face_img: data.face_img,
                    id_card_img_before: data.id_card_img_before,
                    id_card_img_after: data.id_card_img_after,
                    driving_license_img_before: data.driving_license_img_before,
                    driving_license_img_after: data.driving_license_img_after,
                    test_img_1: data.test_img_1,
                    test_img_2: data.test_img_2,
                }
            })
            .catch(err => null);
        if(images)
            for (const [key, value] of Object.entries(images)) {
                if(key)
                    if(value)
                        fs.unlink(path.join('..\\server', value), (err) => {
                            if (err) {
                                console.log(err);
                                return ;
                            }
                        });
            } 
        //trả về dữ liệu cũ 
        await Vehicle_censorship.findOneAndUpdate({user_id: user_id_param}, object)
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //trả về dữ liệu mới
        return await this.getVehicleCensorshipByUserId(user_id_param)
            .then(data => data)
            .catch(err => err);
    }
}

module.exports = new VehicleCensorshipService();