const SenderStatus = require('../models/Sender_Status');
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js");
const statusService = require('./StatusService');
const Status = require('../models/Status');
const Account = require('../models/Account');
const accountService = require('./AccountService');
const fs = require('fs');
const path = require('path');
const { stat } = require('fs/promises');
const mongoose = require('../util/mongoose.js');
const HistorySender = require('../models/History_Sender');
function isEmpty(path) {
    return fs.readdirSync(path).length === 0;
}

class SenderStatusService {

    /*addReceiverStatus = async (account_id, object) => {
        
        return await statusService.addStatus(account_id,"RECEIVER", false) //false vì khi tạo status xong trạng thái chưa hoanaf thành thì bằng false
            .then(status=>{
                //nếu status trả về null thì role vẫn sẽ bị đổi. và code ới dòng 22 sẽ không chạy. 
                //Vì nếu người dùng đã có status chưa hoàn thành. 
                //nếu người dùng chỉnh đổi lại api nhập vào là một user bình thường thì hệ thống sẽ tìm kiếm 
                //và phát hiện trả về null và dòng dưới sẽ đổi lại role rêcive

                // chỉ có role user mới được vào hàm này
                //chưa test nếu thực sự role là sender. Khi đổi về role thường sẽ như thế nào khi vào hàm này
                // dùng if else. if !null thực hiện bt, else lọc status nào có status_completed false thông qua account id ứng với status_tyepe nào thì chuyển về acc role đó. đồng thời xó luôn ảnh vừa tải lên do req.file của multer
                //update role cho account
                accountService.accountUpdate_roleId_byRoleName(account_id, 'receiver');
                
                // //tạo receiver status
                object.status_id = status._id;
                const receiver_status = new ReceiverStatus(object);
                return receiver_status.save()
                    .then(data => mongooseToObject(data))
                    .catch(err =>err);
            })
            .catch(err => err)

    }*/

    addSenderStatus = async (status_id, object) => {
        object.status_id = status_id;
        object.regis_status = false;
        const sender_status = new SenderStatus(object);
        return await sender_status.save()
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    getAllSenderStatus = async() => {
        return SenderStatus.find({})
            .then(datas => multiplemongooseToObject(datas))
            .catch(err => err);
    }

    getSenderStatusDetail = async(sender_status_id_param) =>{
        return await SenderStatus.findOne({_id: sender_status_id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }
    
    getSenderStatusDetail_status_id = async(status_id) =>{
        return await SenderStatus.findOne({status_id: status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    updateSenderStatus = async(sender_status_id, object)=>{
        if(object.picture === "")
            delete object.picture;
        return await SenderStatus.findByIdAndUpdate({_id: sender_status_id}, object)
            .then(data =>{
                if(data){
                    if(object.picture)
                        fs.unlink(path.join('..\\server', data.picture), (err) => {
                            if (err) {
                                console.log(err);
                                return ;
                            }
                        });
                }
                return mongooseToObject(data);
            })
            .catch(err => err);
    }
    // check status đã đưuọc car confirm trong history sender hay chưa
    //car_confirm: true,
    //sender_confirm: false,
    checkCarConfirmHistorySender = async (sender_status_id_param)  =>{
        const histories_sender = await HistorySender.find({sender_status_id: sender_status_id_param, car_confirm: true, sender_confirm: false})
            .then(data => multiplemongooseToObject(data))
            .catch(err => err)
        return histories_sender;
    }

    deleteSenderStatus = async (sender_status_id_param) => {
        const checkCarConfirmHistorySender = await this.checkCarConfirmHistorySender(sender_status_id_param)
        if(checkCarConfirmHistorySender.length === 0){
            //xóa sender status
            const sender_status = await SenderStatus.findByIdAndRemove({_id: sender_status_id_param})
                .then(data => mongooseToObject(data))
                .catch(err=>err);

            //xóa status đi. Đồng thời trả về account id
            const account_id = await Status.findByIdAndRemove({_id: sender_status.status_id})
                .then(data => data.account_id)
                .catch(err=>err);
            //update lại role account -> user 
            await accountService.accountUpdate_roleId_byRoleName(account_id, 'user');

            //xóa trong history sender những dữ liệu chưa được confirm của cả hai.
            //sender_confirm: false,
            //car_confirm: false
            await HistorySender.findOneAndRemove({sender_status_id: sender_status_id_param, sender_confirm: false, car_confirm: false})
                .then(data => data)
                
            if(sender_status.picture){
                //xoa file hinh uploaded
                fs.unlink(path.join('..\\server', sender_status.picture), (err) => {
                    if (err) {
                        console.log(err);
                        return ;
                    }
                })

                //xóa folder nếu trống
                const path_folder = path.join('..\\server', "\\uploads\\status\\SENDER", account_id.toString());
                console.log(path_folder, isEmpty(path.join(path_folder)))
                if(isEmpty(path.join(path_folder)))
                {   
                    try {
                        fs.rmdirSync(path_folder, { recursive: true });
                    
                        console.log(`${path_folder} is deleted!`);
                    } catch (err) {
                        console.error(`Error while deleting ${dir}.`);
                    }
                }
            }
            return sender_status;
        }
        else
            return 'NO DELETE'
    }


}

module.exports = new SenderStatusService();