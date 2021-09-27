const ReceiverStatus = require('../models/Receiver_Status');
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js");
const statusService = require('../service/StatusService');
const Status = require('../models/Status');
const Account = require('../models/Account');
const accountService = require('../service/AccountService');
const fs = require('fs');
const path = require('path');
const { stat } = require('fs/promises');

class ReceiverStatusService {

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

    addReceiverStatus = async (status_id, object) => {
        object.status_id = status_id;
        const receiver_status = new ReceiverStatus(object);
        return await receiver_status.save()
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }

    
    getAllReceiverStatus = async() => {
        return ReceiverStatus.find({})
            .then(datas => multiplemongooseToObject(datas));
    }

    getReceiverStatusDetail = async(receive_status_id_param) =>{
        return await ReceiverStatus.findOne({_id: receive_status_id_param})
            .then(data => mongooseToObject(data));
    }
    
    getReceiverStatusDetail_status_id = async(status_id) =>{
        return await ReceiverStatus.findOne({status_id: status_id})
            .then(data => mongooseToObject(data));
    }

    deleteReceiverStatus = async (receive_status_id_param) => {
        //xóa receiver status
        console.log(receive_status_id_param);
        const receiver_status = await ReceiverStatus.findByIdAndRemove({_id: receive_status_id_param})
            .then(data => mongooseToObject(data))
            .catch(err=>err);

        //xóa status đi. Đồng thời trả về account id
        const account_id = await Status.findByIdAndRemove({_id: receiver_status.status_id})
            .then(data => data.account_id)
            .catch(err=>err);
        //update lại role account -> user 
        await accountService.accountUpdate_roleId_byRoleName(account_id, 'user');

        //xoa file hinh uploaded
        fs.unlink(path.join('..\\server', receiver_status.picture), (err) => {
            if (err) {
                console.log(err);
                return ;
            }
        })

        return receiver_status;
    }


}

module.exports = new ReceiverStatusService();