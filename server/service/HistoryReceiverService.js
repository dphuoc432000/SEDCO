const ReceiverStatus = require('../models/Receiver_Status');
const Status = require('../models/Status');
const CarStatus = require('../models/Car_Status');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const HistoryReceiver = require('../models/History_Receiver');
const statusService = require('./StatusService');
const receiverStatusService = require('./ReceiverStatusService');
const accountService = require('./AccountService');
const userService = require('./UserService');

class HistoryReceiverService{

    //kiểm tra có tồn tại và còn hoạt động hay không car_status hay không
    check_car_status = async (car_status_id_pr) =>{
        const car_status = await CarStatus.findById({_id: car_status_id_pr})
            .then(data => mongooseToObject(data))
            .catch(err => null);
        const check_complete = await Status.findById({_id: car_status.status_id})
            .then(data => {
                data = mongooseToObject(data);
                if(data)
                    if(data.status_completed)
                        return true;
                return false;
            })
        // nếu car_status có dữ liệu và check_complete == false tức là status có và còn hoạt động 
        return car_status && !check_complete?true:false ; 
    }

    //kiểm tra có tồn tạo receiver_status hay không
    check_receiver_status = async (receiver_status_id_pr) =>{
        const receiver_status = await ReceiverStatus.findById({_id: receiver_status_id_pr})
            .then(data => mongooseToObject(data))
            .catch(err => null);
        return receiver_status?true:false ; 
    }

    //kiểm không có data cho receiver_staus trong bảng history_receiver
    checkNoDataHistoryReceiver = async (receiver_status_id_pr) =>{
        const receiver_status = await HistoryReceiver.find({receiver_status_id: receiver_status_id_pr})
            .then(datas => mongooseToObject(datas))
            .catch(err => null);
        return receiver_status?true:false ; 
    }

    //kiểm tra có receiver_status trong history: check confirm 2/2 và complete_status trong bảng status
    checkDataHistoryReceiver = async(receiver_status_id_pr) =>{
        const check = await HistoryReceiver.find({ender_status_id: receiver_status_id_pr})
            .then(datas =>{
                const history_receivers = multiplemongooseToObject(datas);
                const history_receiver_1_2_no_confirm = history_receivers.find(receiver =>{
                    if(!receiver.receiver_confirm || !receiver.car_confirm)
                        return receiver;
                })
                //Khi tìm kiếm trong mảng xong thì
                //Nếu có receiver trả về thì tức là receiver_status vẫn chưa xong giao dịch với car trip thì trả về false;
                //Nếu không có receiver trả về thì tức là mọi giao dịch của receiver_status này với tất cả giao dịch vời nhiều ca trip xong thì trả về true;
                return history_receiver_1_2_no_confirm?false:true;
                //true: đã hoàn thành. 2/2 confirm
                //false: chưa hoàn thành. 0/0 hoặc 1/2 confirm
            })
            console.log("check: ", check)
        return check;
    }

    //kiểm tra status đã hoàn thành trong bảng Statsu
    checkCompleteStatus = async(receiver_status_id_pr) =>{
        const status_id = await ReceiverStatus.findOne({_id: receiver_status_id_pr})
            .then(data => mongooseToObject(data).status_id)
            .catch(err => err);
        const checkCompleteStatus = await statusService.getStatusDetail(status_id)
            .then(data => data.status_completed?true:false)
            .catch(err => err);
        return checkCompleteStatus?true:false;
    }

    //
    carRegisterReceiver = async (car_status_id_pr, receiver_status_id_pr) =>{
        const check_car_status = await this.check_car_status(car_status_id_pr);
        const check_receiver_status = await this.check_receiver_status(receiver_status_id_pr);
        if(check_car_status && check_receiver_status){
            //Điều kiện để chuyến xe đăng ký với receiver_status là:
            //- Không có data trong history_receiver
            //Hoặc
            //- Có data trong history_receiver nhưng:
            // + tất cả data receiver_status đó trong history đã được confirm 2/2 bên
            // + trạng thái hoàn thành status (complete_status) = false. Vì nếu mà true thì cần gì có xe nhận nữa 
            const checkNoDataHistoryReceiver = await this.checkNoDataHistoryReceiver(receiver_status_id_pr);
            const checkDataHistoryReceiver = await this.checkDataHistoryReceiver(receiver_status_id_pr);
            const checkCompleteStatus = await this.checkCompleteStatus(receiver_status_id_pr);
            if(checkNoDataHistoryReceiver ||  (checkDataHistoryReceiver && !checkCompleteStatus)){
                const date = new Date();
                const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                const history_receiver = new HistoryReceiver({
                    car_status_id: car_status_id_pr,
                    receiver_status_id: receiver_status_id_pr,
                    receiver_time: currentDate,
                    receiver_confirm: false,
                    car_confirm: false
                })
                return await history_receiver.save()
                    .then(async data => {
                        //sau khi lưu update lại status đã được đăng ký
                        await receiverStatusService.updateReceiverStatus(receiver_status_id_pr,{regis_status: true})
                        return mongooseToObject(data)
                    })
                    .catch(err => err);
            }
            return "NOT COMPLETED"
        }
        return null;
    }

    //Lấy ra những người đã được chuyến xe đăng ký nhưng chưa gủi nhu yếu phẩm(chưa click nut xác nhận)
    //Điều kiện lọc:
    //- Có data trong history_receiver
    //- Chưa được 2/2 confirm (confirm 0/2)
    getAllRegisterReceiverNoConfirm_0_2 = async(car_status_id_pr) =>{
        //lấy tất cả các receiver_status đã được chuyến xe đăng ký và confirm 0/2 bằng car_status_id
        const regisReceiverList = await HistoryReceiver.find({
            car_status_id: car_status_id_pr,
            receiver_confirm: false,
            car_confirm: false
        }).then(datas => multiplemongooseToObject(datas))
          .catch(err => null);
        //   console.log(regisReceiverList)
        if(regisReceiverList.length > 0) {
            let statusList = Promise.all(regisReceiverList.map(async regisReceiver =>{
                const receiver_status = await receiverStatusService.getReceiverStatusDetail(regisReceiver.receiver_status_id)
                    .then(data => data)
                    .catch(err => err);
                    // console.log(receiver_status)
                if(receiver_status)
                    return await Status.findOne({_id: receiver_status.status_id, status_completed: false})
                        .then(async data =>{
                            data = mongooseToObject(data);
                            data.detail = receiver_status;
                            const account = await accountService.getAccountDetails(data.account_id)
                            data.user = await userService.getUserByID(account.user_id);
                            return data;
                        })
                        .catch(err => err)
            }))
            return statusList;
        }
        //nếu regisReceiverList = [] thì không tìm thấy chuyến xe
        return null;
    }
}

module.exports = new HistoryReceiverService()