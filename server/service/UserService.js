const User = require("../models/User");
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js");
const carStatusSevice = require('./CarStatusService');
const carService = require('./CarService');
const vehicleCensorshipService = require('./VehicleCensorshipService');
const Status = require('../models/Status');
const Account = require('../models/Account');
class UserService{

    getUserList = async () =>{
        return await User.find({}) // return về promise
            .then(users =>{
                return multiplemongooseToObject(users);  //return về data promise
            })
            .catch(err => err);
    }

    getUserByID = async (id) =>{
        return await User.findById({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    addUser = async(object) =>{
        const user = new User(object);
        return await user.save()
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }
    updateUserInfor = async(id, object) =>{
        return await User.findByIdAndUpdate({_id: id}, object)
        .then(async user =>{
            user = mongooseToObject(user)
            //lưu hình ảnh vehicle_ship
            const vehicle_censorship = await vehicleCensorshipService.getVehicleCensorshipByUserId(user._id)
            .catch(err => err);
            //nếu đã có hình ảnh của tài xế rồi thì cập nhật hình ảnh
            // console.log('vehicle_censorship', vehicle_censorship)
            if(vehicle_censorship)
                user.vehicle_censorship = await vehicleCensorshipService.updateVehicleCensorshipByUserIDForUserInfor(user._id, object.file_images)
                    .catch(err => err);
            else
                user.vehicle_censorship = await vehicleCensorshipService.addVehicleCensorship(user._id,object.file_images)
                    .then(data => data)
                    .catch(err => err);
            
            return user;
        
        
        })
        .catch(err => err);


    }

    updateUser = async(id, object) =>{
        return await User.findByIdAndUpdate({_id: id}, object)
            .then(async user =>{
                user = mongooseToObject(user)
                //lưu hình ảnh vehicle_ship
                const vehicle_censorship = await vehicleCensorshipService.getVehicleCensorshipByUserId(user._id)
                .catch(err => err);
                //nếu đã có hình ảnh của tài xế rồi thì cập nhật hình ảnh
                // console.log('vehicle_censorship', vehicle_censorship)
                if(vehicle_censorship)
                    user.vehicle_censorship = await vehicleCensorshipService.updateVehicleCensorshipByUserID(user._id, object.file_images)
                        .catch(err => err);
                else
                    user.vehicle_censorship = await vehicleCensorshipService.addVehicleCensorship(user._id,object.file_images)
                        .then(data => data)
                        .catch(err => err);
                
                return user;
            
            
            })
            .catch(err => err);

    
    }

    deleteUser = async(id) =>{
        return await User.findByIdAndRemove({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    getUserDetailByEmail = async(email_param) =>{
        return await User.findOne({email: email_param})
            .then(user => mongooseToObject(user))
            .catch(err=>err);
    }

    //lấy ra tất cả thông tin một thông tin(car trip) essential cuả status
    getEssentialOfStatus = async(status_id_param) =>{
        const status =  await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status))
            .catch(err => err);
        let status_detail;
        if(status)
           status_detail = await carStatusSevice.getCarStatusDetail_status_id(status_id_param);
        return status_detail;
    }
    //lấy chi tiết nhất của status
    getStatusDetail = async(status_id_param)=>{
        const status = await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status))
            .catch(err=>err);
        let status_detail;
        let object;
        if(status){
            status_detail = await this.getEssentialOfStatus(status_id_param);
            object = {...status, detail: {...status_detail}};
        }
        else
            object = null; 
        return object;
    }

    getAllUserDriverNoCensorship = async (_limit,_page) => {
        //lấy ra mảng car status chưa được kiểm duyệt
        const carStatusNoCensorshipList = await carStatusSevice.getAllCarStatusNoCensorship(_limit,_page)
            .catch(err => err);
        //lấy mảng user[driver] chưa được kiểm duyệt bằng user_id trong CARINFOR 
        const userDriverNoCensorship = Promise.all(carStatusNoCensorshipList.car_status_list.map(async carStatus => {
            const car_infor = await carService.getCarbyID(carStatus.car_id);
            const user_id = car_infor.user_id.toString();
            const userDriver = await this.getUserByID(user_id);
            userDriver.car_status = await this.getStatusDetail(carStatus.status_id);
            userDriver.vehicle_censorship = await vehicleCensorshipService.getVehicleCensorshipByUserId(user_id);
            return userDriver;
        }))
        return {
            user_driver_no_censorship: await userDriverNoCensorship,
            pagination: carStatusNoCensorshipList.pagination
        };
    }

    getUserByAccountId = async(account_id) =>{
        const account = await Account.findById({_id: account_id})
            .then(data => mongooseToObject(data));
        if(account){
            return await User.findById({_id: account.user_id})
                .then(data => mongooseToObject(data))
                .catch(err => err);  
        }
        return null;
    }
}

module.exports = new UserService();