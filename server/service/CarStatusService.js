const CarStatus = require('../models/Car_Status');
const { multiplemongooseToObject, mongooseToObject } = require("../util/mongoose.js");
const fs = require('fs');
const path = require('path');
const carService = require('./CarService');
const Status = require('../models/Status');
const accountService = require('./accountService');
const { stat } = require('fs/promises');
const essentialsService = require('./EssentialService')
const HistorySender = require('../models/History_Sender');
const HistoryReceiver = require('../models/History_Receiver');
const SenderStatus = require('../models/Sender_Status');
const ReceiverStatus = require('../models/Receiver_Status');
const Car_Status = require('../models/Car_Status');
const User = require('../models/User');
const mongoose = require('../util/mongoose.js');

function isEmpty(path) {
    return fs.readdirSync(path).length === 0;
}

class CarStatusService {
    checkShippingStatus = (censorship, departure_time, current_time) => {
        return censorship && current_time >= departure_time ? true : false;
    };
    checkReceivingStatus = (censorship, start_receiver_time, current_time) => {
        return censorship && current_time >= start_receiver_time ? true : false;
    };

    //Lấy tất cả essential theo định dạng essential_id và quantity
    getEssentials = async () => {
        const essentials = await essentialsService.getAllEssential()
            .then(data => data);
        return await essentials.map(essential => {
            return {
                essential_id: essential._id,
                quantity: 0
            }
        })
    }

    addCarStatus = async (status_id, user_id, object) => {
        const car_object = { ...object.car };
        // const car_of_user = await carService.getCarByUserID(user_id);
        // console.log('car_of_user', car_of_user)
        let car_id;
        // if (!car_of_user) {
            car_id = await carService.addCar(user_id, car_object)
                .then(car_data => car_data._id)
                .catch(err => err);
            // console.log('car_id',car_id);
        // }
        // else {
        //     car_id = await carService.updateCarByUserID(user_id, car_object)
        //         .then(car_data => car_data._id)
        //         .catch(err => err);
        // }
        const date = new Date();
        const current_date = date.getDate();
        const current_month = date.getMonth() + 1;
        const current_year = date.getFullYear();
        const current_time = Date.parse(`${current_year}-${current_month}-${current_date}`);
        const start_receive_time = Date.parse(object.start_receive_time);
        const departure_time = Date.parse(object.departure_time);
        const car_status_object = {
            status_id: status_id,
            start_receive_time: object.start_receive_time,
            departure_time: object.departure_time,
            location_start: object.location_start,
            location_finish: object.location_finish,
            note: object.note,
            picture: object.picture,
            censorship: false,
            //Nếu mà tạo vào thì phải = false chờ admin kiểm duyệt rồi mới được cập nhật trạng thái. Khi được admin kiểm duyệt censorship = true thì
            //receiving_status, shipping_status được kiểm duyệt hàm dưới trong hàm cập nhật CarStatus
            // receiving_status: this.checkReceivingStatus(censorship, start_receive_time, current_time),
            // shipping_status:this.checkShippingStatus(censorship,departure_time, current_time),
            receiving_status: false,
            shipping_status: false,
            car_id: car_id,
            essentials: await this.getEssentials()
        };
        const car = new CarStatus(car_status_object);
        return await car.save()
            .then((data) => mongooseToObject(data))
            .catch((err) => err);
    };

    // getCarStatusDetail_status_id = async(status_id) =>{
    //     return await CarStatus.findOne({status_id: status_id})
    //         .then(data => mongooseToObject(data))
    //         .catch(err => err);
    // }

    //kiểm tra tất cả regis đã được confirm 2/2 trong history sender
    checkAllCarRegisStatusComfirmInHistorySender = async (car_status_id_param) =>{
        //lấy tất cả các phàn tử có trong history sender
        const car_regis_list = await HistorySender.find({car_status_id: car_status_id_param})
            .then(data => multiplemongooseToObject(data));
        //lấy tất cả các phần tử đã được conform 2/2 trong history sender
        const car_regis_confirm_2_2_list = await HistorySender.find({car_status_id: car_status_id_param, car_confirm: true, sender_confirm: true})
            .then(data => multiplemongooseToObject(data))
        const car_regis_confirm_0_2_list = await HistorySender.find({car_status_id: car_status_id_param, car_confirm: false, sender_confirm: false})
            .then(data => multiplemongooseToObject(data))
        if(car_regis_list.length === car_regis_confirm_2_2_list.length + car_regis_confirm_0_2_list.length)
            return true;
        return false;
    }

    //kiểm tra tất cả regis đã được confirm 2/2 trong history receiver
    checkAllCarRegisStatusComfirmInHistoryReceiver = async (car_status_id_param) =>{
        //lấy tất cả các phàn tử có trong history receiver
        const car_regis_list = await HistoryReceiver.find({car_status_id: car_status_id_param})
            .then(data => multiplemongooseToObject(data));
        //lấy tất cả các phần tử đã được conform 2/2 trong history receiver
        const car_regis_confirm_2_2_list = await HistoryReceiver.find({car_status_id: car_status_id_param, car_confirm: true, receiver_confirm: true})
            .then(data => multiplemongooseToObject(data))
        const car_regis_confirm_0_2_list = await HistoryReceiver.find({car_status_id: car_status_id_param, car_confirm: false, receiver_confirm: false})
            .then(data => multiplemongooseToObject(data))
        if(car_regis_list.length === car_regis_confirm_2_2_list.length + car_regis_confirm_0_2_list.length)
            return true;
        return false;
    }

    deleteCarStatus = async (car_status_id_param) => {
        //nếu cả 2 đã đưuọc confirm 2/2 hết thì cho xóa
        console.log(await this.checkAllCarRegisStatusComfirmInHistorySender(car_status_id_param) , await this.checkAllCarRegisStatusComfirmInHistoryReceiver(car_status_id_param))
        if(await this.checkAllCarRegisStatusComfirmInHistorySender(car_status_id_param) &&  await this.checkAllCarRegisStatusComfirmInHistoryReceiver(car_status_id_param)){

            //xóa car status
            // console.log(receive_status_id_param);
            const car_status = await CarStatus.findByIdAndRemove({
                _id: car_status_id_param,
            })
                .then((data) => mongooseToObject(data))
                .catch((err) => err);
            // console.log(car_status)
            //xóa status đi. Đồng thời trả về account id
            const account_id = await Status.findByIdAndRemove({
                _id: car_status.status_id,
            })
                .then((data) => data.account_id)
                .catch((err) => err);
            //update lại role account -> user
            await accountService.accountUpdate_roleId_byRoleName(account_id, "user");
            //xóa data trong history sender
            //car_confim: false
            //sender_confirm: false
            await HistorySender.find({car_status_id: car_status_id_param, car_confirm: false, sender_confirm: false})
                .then(async data =>{
                    data = multiplemongooseToObject(data);
                    const id_list = data.map(item =>{
                        return item._id
                    })
                    const sender_status_id_list = data.map(item =>{
                        return item.sender_status_id
                    })
                    const data_delete = await HistorySender.deleteMany({_id: {$in: [...id_list]}})
                        .then(data => data)
                    console.log('data_delete', data_delete)
                    const data_update = await SenderStatus.updateMany({_id: {$in: [...sender_status_id_list]}},{regis_status: false})
                        .then(data => data)
                    console.log('data_update', data_update)
                })
            //xóa data trong history sender
            //car_confim: false
            //receiver_confirm: false
            //Không cần 2 điều kiên trên nữa vì nó đã được lọc trên 2 lần check trên
            await HistoryReceiver.find({car_status_id: car_status_id_param, car_confirm: false, receiver_confirm: false})
                .then(async data =>{
                    data = multiplemongooseToObject(data);
                    const id_list = data.map(item =>{
                        return item._id
                    })
                    const receiver_status_id_list = data.map(item =>{
                        return item.receiver_status_id
                    })
                    const data_delete = await HistoryReceiver.deleteMany({_id: {$in: [...id_list]}})
                        .then(data => data)
                    console.log('data_delete', data_delete)
                    const data_update = await ReceiverStatus.updateMany({_id: {$in: [...receiver_status_id_list]}},{regis_status: false})
                        .then(data => data)
                    console.log('data_update', data_update)
                })
            //xoa file hinh uploaded
            if (car_status.picture) {
                fs.unlink(path.join("..\\server", car_status.picture), (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

                //xoa folder nếu trống
                const path_folder = path.join(
                    "..\\server",
                    "\\uploads\\status\\CAR_TRIP",
                    account_id.toString()
                );
                if (isEmpty(path.join(path_folder))) {
                    try {
                        fs.rmdirSync(path_folder, { recursive: true });

                        console.log(`${path_folder} is deleted!`);
                    } catch (err) {
                        console.error(`Error while deleting ${dir}.`);
                    }
                }
            }
            return car_status;            
        }
        else
            return 'NO DELETE';
    };

    //Lấy các chuyến xe chưa được kiểm duyệt ->userService
    getAllCarStatusNoCensorship = async (_limit, _page) => {
        let limit = parseInt(_limit);
        let page = parseInt(_page)
        let start;
        if (limit && page) {
            if (page < 1 || typeof page !== 'number')
                page = 1;
            if (limit < 1 || typeof limit !== 'number')
                limit = 1;
        }
        start = (page * limit) - limit;
        const totalRows = await CarStatus.count({censorship: false})
        let car_status_list = await CarStatus.find({ censorship: false })
            .then(data => multiplemongooseToObject(data))
            .then(async data =>{
                const arr = await Promise.all(data.filter(async car_status =>{
                    const status = await Status.findOne({_id: car_status.status_id, status_completed: false})
                        .then(data => mongooseToObject(data))
                    // console.log(status)
                    return status !== null
                }))
                // console.log(arr)
                return arr;
            });
        
        return {
            car_status_list: car_status_list,
            pagination: {
                _limit: limit,
                _page: page,
                totalRows
            }
        }
    }

    //lấy tất cả các chuyến xe bao gồm chưa được kiểm duyệt và đã được kiểm duyệt
    // getAllCarStatus
    getCarStatusDetail_status_id = async (status_id) => {
        return await CarStatus.findOne({ status_id: status_id })
            .then(async data => {
                const carStatus = mongooseToObject(data);
                carStatus.car = await carService.getCarbyID(data.car_id)
                    .catch(err => err);
                return carStatus;
            })
            .catch(err => err);
    }
    updateCarStatusInfor = async (car_status_id, object) => {
        const car = object.car;
        const car_status = {
            start_receive_time: object.start_receive_time,
            departure_time: object.departure_time,
            location_start: object.location_start,
            location_finish: object.location_finish,
            note: object.note,
            picture: object.picture,
        };
        if (car_status.picture === "") delete car_status.picture;
        const car_status_update = await CarStatus.findByIdAndUpdate(
            { _id: car_status_id },
            car_status
        )
            .then(async (data) => {
                const update_data = mongooseToObject(data);
                if ("picture" in car_status === true) {
                    if (update_data.picture)
                        fs.unlink(path.join("..\\server", update_data.picture), (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                }
                //trả về lại car_status với dữ liệu mới
                const car_status_current = await CarStatus.findById({ _id: update_data._id, })
                    .then((data) => mongooseToObject(data))
                    .catch((err) => err);
                car_status_current.car = await carService.updateCarById(update_data.car_id, car)
                    .then(data => data)
                    .catch(err => err);
                return car_status_current;
            })
            .catch(err => err);
        // console.log('new car', car_status_update)
        return car_status_update;

    }

    checkCensorship = async (car_status_id) => {
        return await CarStatus.findById({ _id: car_status_id })
            .then(data => {
                data = mongooseToObject(data);
                if (data.censorship)
                    return true;
                return false;
            })
            .catch(err => err);
    }

    //Admin kiểm duyệt tài xế
    censorshipCarStatus = async (car_status_id) =>{
        //kiểm tra car_status_id có tồn tại hay không
        const car_status_data = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        if(car_status_data){
            if(!car_status_data.censorship)
                return await CarStatus.findByIdAndUpdate({_id: car_status_id},{censorship: true})
                    .then(data => mongooseToObject(data))
                    .catch(err => err);
            return 'CENSORED'
        }
        return null;
    }
    
    getCarStatusDetail_car_status_id = async(car_status_id) =>{
        const car_status_data = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        if(car_status_data){
            return car_status_data;
        }
        return null;
    }

    countNumberOfStatusRegis = async (car_status_id) =>{
        const number_of_receiver_regis = await HistoryReceiver.count({car_status_id: car_status_id, receiver_confirm: false})
            .then(data => data);
        const number_of_sender_regis = await HistorySender.count({car_status_id: car_status_id, sender_confirm: false})
            .then(data => data);
        return {
            number_of_receiver_regis,
            number_of_sender_regis
        }
    }


    //kiểm tra chuyến xe đã hoàn thành tất cả statsus đăng ký hay chưua
    checkAllCarRegisStatusComfirmInHistorySender_2_2_Or_0_2 = async(car_status_id) =>{
        //lấy tất cả các phàn tử có trong history sender
        const car_regis_list = await HistorySender.find({car_status_id: car_status_id})
            .then(data => multiplemongooseToObject(data));
        //lấy tất cả các phần tử đã được conform 2/2 trong history sender
        const car_regis_confirm_2_2_list = await HistorySender.find({car_status_id: car_status_id, car_confirm: true, sender_confirm: true})
            .then(data => multiplemongooseToObject(data))
        if(car_regis_list.length === 0 || car_regis_list.length === car_regis_confirm_2_2_list.length)
            return true;
        return false;
    }
    checkAllCarRegisStatusComfirmInHistoryReceiver_2_2_Or_0_2 = async(car_status_id) =>{
        //lấy tất cả các phàn tử có trong history receiver
        const car_regis_list = await HistoryReceiver.find({car_status_id: car_status_id})
            .then(data => multiplemongooseToObject(data));
        //lấy tất cả các phần tử đã được conform 2/2 trong history receiver
        const car_regis_confirm_2_2_list = await HistoryReceiver.find({car_status_id: car_status_id, car_confirm: true, receiver_confirm: true})
            .then(data => multiplemongooseToObject(data))
        if(car_regis_list.length === 0 || car_regis_list.length === car_regis_confirm_2_2_list.length)
            return true;
        return false;
    }

    //Check số lượng nhu yếu phẩm trong chuyến xe còn hay không
    checkNumberOfEssential = async (car_status_id) =>{
        const car_status = await Car_Status.findById({_id: car_status_id})
            .then(data => mongooseToObject(data));
        if(car_status)
            return !car_status.essentials.some(essential => essential.quantity >0)
        return false;
    }

    completeCarStatus = async (car_status_id) =>{
        //kiểm tra số lượng nhu yếu phẩm trong car_status tất cả đểu = 0 hoặc nhỏ hơn 0
        if(await this.checkNumberOfEssential(car_status_id)){
            //Trường hợp đúng số lượng tất cả là 0
            //Kiểm tra tất cả status đã được confirm 2/2 chưa
            //Điều kiện: độ dài mảng bằng 0 hoặc tổng số data bằng tổng số data đã confirm 2/2
            if(await this.checkAllCarRegisStatusComfirmInHistorySender_2_2_Or_0_2(car_status_id) &&  await this.checkAllCarRegisStatusComfirmInHistoryReceiver_2_2_Or_0_2(car_status_id)){
                //Trường hợp tất cả đã được confirm 2/2
                //1. update receiving_status:false, shipping_status:false
                //2. update status_completed: true,
                //3. update role account về user
                const car_status = await Car_Status.findByIdAndUpdate({_id: car_status_id},{receiving_status:false, shipping_status:false})
                    .then(car_status_data => mongooseToObject(car_status_data))
                if(car_status){
                    //update status_completed: true,
                    await Status.findByIdAndUpdate({_id: car_status.status_id},{status_completed: true})
                        .then(status => mongooseToObject(status))
                        .then(async status =>{
                            //update roleAccount
                            await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user');
                        })
                        .catch(err => err)
                    return car_status;
                } 
                return 'NO DATA'
            }
            return 'NO COMPLETED TRANSACTION'
        }
        return null;
    }

    historyTransactionCar = async (car_status_id) =>{
        //kieemr tra car status ton taij
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data));
        if(car_status){
            let history_sender_list = await HistorySender.find({car_status_id: car_status_id, car_confirm: true})
                .then(data => multiplemongooseToObject(data))
                .catch(err => err);
            if(history_sender_list.length > 0) {
                history_sender_list = Promise.all(history_sender_list.map(async regisSender =>{
                    const sender_status = await SenderStatus.findOne({_id: regisSender.sender_status_id})
                        .then(data => mongooseToObject(data))
                        .catch(err => err);
                        // console.log(receiver_status)
                    if(sender_status)
                        return await Status.findOne({_id: sender_status.status_id})
                            .then(async data =>{
                                data = mongooseToObject(data);
                                data.detail = sender_status;
                                data.history = regisSender;
                                const account = await accountService.getAccountDetails(data.account_id)
                                data.user = await User.findById({_id: account.user_id})
                                    .then(user => mongooseToObject(user))
                                    .catch(err => err);
                                return data;
                            })
                            .catch(err => err)
                }))
            }
            let history_receiver_list = await HistoryReceiver.find({car_status_id: car_status_id, car_confirm: true})
                .then(data => multiplemongooseToObject(data))
                .catch(err => err);
            if(history_receiver_list.length > 0) {
                history_receiver_list = Promise.all(history_receiver_list.map(async regisReceiver =>{
                    const receiver_status = await ReceiverStatus.findOne({_id: regisReceiver.receiver_status_id})
                        .then(data => mongooseToObject(data))
                        .catch(err => err);
                        // console.log(receiver_status)
                    if(receiver_status)
                        return await Status.findOne({_id: receiver_status.status_id})
                            .then(async data =>{
                                data = mongooseToObject(data);
                                data.detail = receiver_status;
                                data.history = regisReceiver;
                                const account = await accountService.getAccountDetails(data.account_id)
                                data.user = await User.findById({_id: account.user_id})
                                    .then(user => mongooseToObject(user))
                                    .catch(err => err);
                                return data;
                            })
                            .catch(err => err)
                }))
            }
            let list = [... await history_sender_list, ... await history_receiver_list];
            list = list.sort((objectA, objectB)=>{
                console.log( (objectB.detail.updatedAt), (objectA.detail.updatedAt))
                return new Date(objectB.detail.updatedAt)- new Date(objectA.detail.updatedAt) ;
            })
            return list;
        }
        return null;
    }
}

module.exports = new CarStatusService();    
