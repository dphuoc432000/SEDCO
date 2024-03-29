const ReceiverStatus = require('../models/Receiver_Status');
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js");
const statusService = require('../service/StatusService');
const Status = require('../models/Status');
const Account = require('../models/Account');
const accountService = require('../service/AccountService');
const fs = require('fs');
const path = require('path');
const { stat } = require('fs/promises');
const HistoryReceiver = require('../models/History_Receiver');

function isEmpty(path) {
    return fs.readdirSync(path).length === 0;
}

class ReceiverStatusService {

    /*addReceiverStatus = async (account_id, object) => {
        
        return await statusService.addStatus(account_id,"RECEIVER", false) //false vì khi tạo status xong trạng thái chưa hoanaf thành thì bằng false
            .then(status=>{
                //nếu status trả về null thì role vẫn sẽ bị đổi. và code ới dòng 22 sẽ không chạy. 
                //Vì nếu người dùng đã có status chưa hoàn thành. 
                //nếu người dùng chỉnh đổi lại api nhập vào là một user bình thường thì hệ thống sẽ tìm kiếm 
                //và phát hiện trả về null và dòng dưới sẽ đổi lại role rêcive

                // chỉ có role user mới được vào hàm này
                //chưa test nếu thực sự role là receiver. Khi đổi về role thường sẽ như thế nào khi vào hàm này
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
        object.regis_status = false;
        console.log(object);
        const receiver_status = new ReceiverStatus(object);
        return await receiver_status.save()
            .then(data => mongooseToObject(data))
            .catch(err => {console.log(err)});
    }

    
    getAllReceiverStatus = async() => {
        return ReceiverStatus.find({})
            .then(datas => multiplemongooseToObject(datas))
            .catch(err => err);
    }

    getReceiverStatusDetail = async(receive_status_id_param) =>{
        return await ReceiverStatus.findOne({_id: receive_status_id_param})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }
    
    getReceiverStatusDetail_status_id = async(status_id) =>{
        return await ReceiverStatus.findOne({status_id: status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
    }


    updateReceiverStatus = async(receiver_status_id, object)=>{
        if(object.picture === "")
            delete object.picture;
        return await ReceiverStatus.findByIdAndUpdate({_id: receiver_status_id}, object)
            .then(data =>{
                if(data){
                    if(object.picture )
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

    checkCarConfirmHistoryReceiver = async (receiver_status_id_param)  =>{
        const histories_receiver = await HistoryReceiver.find({receiver_status_id: receiver_status_id_param, car_confirm: true, receiver_confirm: false})
            .then(data => multiplemongooseToObject(data))
            .catch(err => err)
        return histories_receiver;
    }

    deleteReceiverStatus = async (receive_status_id_param) => {
        //xóa receiver status
        // console.log(receive_status_id_param);
        const checkCarConfirmHistoryReceiver = await this.checkCarConfirmHistoryReceiver(receive_status_id_param);
        if(checkCarConfirmHistoryReceiver.length === 0){
            const receiver_status = await ReceiverStatus.findByIdAndRemove({_id: receive_status_id_param})
                .then(data => mongooseToObject(data))
                .catch(err=>err);

            //xóa status đi. Đồng thời trả về account id
            const account_id = await Status.findByIdAndRemove({_id: receiver_status.status_id})
                .then(data => data.account_id)
                .catch(err=>err);
            //update lại role account -> user 
            await accountService.accountUpdate_roleId_byRoleName(account_id, 'user');

            //xóa trong history receiver những dữ liệu chưa được confirm của cả hai.
            //receiver_confirm: false,
            //car_confirm: false
            await HistoryReceiver.findOneAndRemove({receiver_status_id: receive_status_id_param, receiver_confirm: false, car_confirm: false})
                .then(data => data)
                
            if(receiver_status.picture){
                //xoa file hinh uploaded
                fs.unlink(path.join('..\\server', receiver_status.picture), (err) => {
                    if (err) {
                        console.log(err);
                        return ;
                    }
                });

                //xoa folder nếu trống
                const path_folder = path.join('..\\server', "\\uploads\\status\\RECEIVER", account_id.toString());
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
            return receiver_status;
        }
        else
            return 'NO DELETE'
    }
    //hoàn thành ReceiverStatus
    completeReceiverStatus = async (receiver_status_id) => {
        //kiểm tra có receiver status không
        const receiver_status = await ReceiverStatus.findById({_id: receiver_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        if(receiver_status){
            //trường hợp có receiver_status
            //kiểm tra có receiver có đang trong quá trình giao dịch không
            const receiver_in_trans_list = await HistoryReceiver.find({receiver_status_id: receiver_status_id, car_confirm: true, receiver_confirm: false})
                .then(data => multiplemongooseToObject(data));
            if(receiver_in_trans_list.length > 0)
                return 'TRADING';
            //xóa những receiver chưa được chuyến xe confirm
            await HistoryReceiver.deleteMany({receiver_status_id: receiver_status_id, car_confirm: false, receiver_confirm: false})
                .then(data => data);
            //update regis_status false
            await ReceiverStatus.findByIdAndUpdate({_id: receiver_status_id}, {regis_status: false})
                .then(data => data)
            //update status_completed
            const status = await Status.findByIdAndUpdate({_id: receiver_status.status_id},{status_completed: true})
                .then(data => mongooseToObject(data))
                .catch(err => err);
            //chuyển về role user
            if(status)
                await accountService.accountUpdate_roleId_byRoleName(status.account_id,'user');
            return receiver_status;
        }
        return null;
    }
}

module.exports = new ReceiverStatusService();