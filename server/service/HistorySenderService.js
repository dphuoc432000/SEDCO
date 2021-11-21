const SenderStatus = require('../models/Sender_Status');
const Status = require('../models/Status');
const CarStatus = require('../models/Car_Status');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const HistorySender = require('../models/History_Sender');
const statusService = require('./StatusService');
const senderStatusService = require('./SenderStatusService');
const accountService = require('./AccountService');
const userService = require('./UserService');
const handlePagination = require('../middlewares/handlePagination')
class HistorySenderService{

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

    //kiểm tra có tồn tạo sender_status hay không
    check_sender_status = async (sender_status_id_pr) =>{
        const sender_status = await SenderStatus.findById({_id: sender_status_id_pr})
            .then(data => mongooseToObject(data))
            .catch(err => null);
        return sender_status?true:false ; 
    }

    //kiểm không có data cho sender_staus trong bảng history_sender
    checkNoDataHistorySender = async (sender_status_id_pr) =>{
        const sender_status = await HistorySender.find({sender_status_id: sender_status_id_pr})
            .then(datas => mongooseToObject(datas))
            .catch(err => null);
        return sender_status?true:false ; 
    }

    //kiểm tra có sender_status trong history: check confirm 2/2 và complete_status trong bảng status
    checkDataHistorySender = async(sender_status_id_pr) =>{
        const check = await HistorySender.find({sender_status_id: sender_status_id_pr})
            .then(datas =>{
                const history_senders = multiplemongooseToObject(datas);
                const history_sender_1_2_no_confirm = history_senders.find(sender =>{
                    if(!sender.sender_confirm || !sender.car_confirm)
                        return sender;
                })
                //Khi tìm kiếm trong mảng xong thì
                //Nếu có sender trả về thì tức là sender_status vẫn chưa xong giao dịch với car trip thì trả về false;
                //Nếu không có sender trả về thì tức là mọi giao dịch của sender_status này với tất cả giao dịch vời nhiều ca trip xong thì trả về true;
                return history_sender_1_2_no_confirm?false:true;
                //true: đã hoàn thành. 2/2 confirm
                //false: chưa hoàn thành. 0/0 hoặc 1/2 confirm
            })
            console.log("check: ", check)
        return check;
    }

    //kiểm tra status đã hoàn thành trong bảng Statsu
    checkCompleteStatus = async(sender_status_id_pr) =>{
        const status_id = await SenderStatus.findOne({_id: sender_status_id_pr})
            .then(data => mongooseToObject(data).status_id)
            .catch(err => err);
        const checkCompleteStatus = await statusService.getStatusDetail(status_id)
            .then(data => data.status_completed?true:false)
            .catch(err => err);
        return checkCompleteStatus?true:false;
    }

    //
    carRegisterSender = async (car_status_id_pr, sender_status_id_pr) =>{
        const check_car_status = await this.check_car_status(car_status_id_pr);
        const check_sender_status = await this.check_sender_status(sender_status_id_pr);
        if(check_car_status && check_sender_status){
            //Điều kiện để chuyến xe đăng ký với sender_status là:
            //- Không có data trong history_sender
            //Hoặc
            //- Có data trong history_sender nhưng:
            // + tất cả data sender_status đó trong history đã được confirm 2/2 bên
            // + trạng thái hoàn thành status (complete_status) = false. Vì nếu mà true thì cần gì có xe nhận nữa 
            const checkNoDataHistorySender = await this.checkNoDataHistorySender(sender_status_id_pr);
            const checkDataHistorySender = await this.checkDataHistorySender(sender_status_id_pr);
            const checkCompleteStatus = await this.checkCompleteStatus(sender_status_id_pr);
        
            // console.log(checkNoDataHistorySender, checkDataHistorySender, checkCompleteStatus)
            if(checkNoDataHistorySender ||  (checkDataHistorySender && !checkCompleteStatus)){
                const date = new Date();
                const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                const history_sender = new HistorySender({
                    car_status_id: car_status_id_pr,
                    sender_status_id: sender_status_id_pr,
                    sender_time: currentDate,
                    sender_confirm: false,
                    car_confirm: false
                })
                return await history_sender.save()
                    .then(async data => {
                        //sau khi lưu update lại status đã được đăng ký
                        await senderStatusService.updateSenderStatus(sender_status_id_pr,{regis_status: true})
                        return mongooseToObject(data)
                    })
                    .catch(err => err);
            }
            return "NOT COMPLETED"
        }
        return null;
    }

    //Lấy ra những người đã được chuyến xe đăng ký nhưng chưa nhận nhu yếu phẩm(chưa click nut xác nhận)
    //Điều kiện lọc:
    //- Có data trong history_sender
    //- Chưa được 2/2 confirm (confirm 0/2)
    getAllRegisterSenderNoConfirm_0_2 = async(car_status_id_pr) =>{
        //lấy tất cả các sender_status đã được chuyến xe đăng ký và confirm 0/2 bằng car_status_id
        const regisSenderList = await HistorySender.find({
            car_status_id: car_status_id_pr,
            sender_confirm: false,
            car_confirm: false
        }).then(datas => multiplemongooseToObject(datas))
          .catch(err => null);
        if(regisSenderList.length > 0) {
            let statusList = Promise.all(regisSenderList.map(async regisSender =>{
                const sender_status = await senderStatusService.getSenderStatusDetail(regisSender.sender_status_id)
                    .then(data => data)
                    .catch(err => err); 
                if(sender_status)
                    return await Status.findOne({_id: sender_status.status_id, status_completed: false})
                        .then(async data =>{
                            data = mongooseToObject(data);
                            data.detail = sender_status;
                            const account = await accountService.getAccountDetails(data.account_id)
                            data.user = await userService.getUserByID(account.user_id);
                            return data;
                        })
                        .catch(err => err)
            }))
            return statusList;
        }
        //nếu regisSenderList = [] thì không tìm thấy chuyến xe
        return null;
    }

    getAllHistoryRegisterSenderBySenderStatusID =  async (sender_status_id,_limit,_page) =>{
        const totalRows = await HistorySender.count({sender_status_id: sender_status_id});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_sender_list  = await HistorySender.find({sender_status_id: sender_status_id})
            .skip(start)
            .limit(pagination._limit)
            .then(data => multiplemongooseToObject(data))
            .catch(err => err);
        return{
            history_sender_list: history_sender_list,
            pagination
        }
    }
}

module.exports = new HistorySenderService();