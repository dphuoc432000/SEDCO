const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');
const Status = require('../models/Status');
const accountService = require('./AccountService.js');
const receiverStatusService = require('./ReceiverStatusService')


//update số lượng essential. Cho form nhập số lượng rồi bấm update sẽ chuyển body lên qua URL có các param status ID, loại STATUS. Lấy ra status với status_id. Từ status so sánh status_type với loại STATUS. Nếu đúng thì sửa đổi sai thì trả về null hoặc báo lỗi không đúng
//update status_completed
class StatusService {

    //Check tất cả trạng thái của 1 account_id.
    //Nêu có 1 trạng thái bất kỳ nào false thì không được tạo trạng thái mới
    //Nếu tất cả đề true thì cho tạo trạng thái mới
    //check account có status chưa hoàn thành -> status_completed: false
    check_accID_has_status_no_complete = async (id) =>{
        let statusList = await Status.find({account_id: id,status_completed: false})
            .then(status => multiplemongooseToObject(status));
        if(statusList.length === 0)
            return false;
        return true;
    }

    // OK
    // Status sẽ được add khi tất cả status trước đó đã được hoàn thành --> status_completed: true;
    addStatus = async (account_id_param, status_type_param, object) => {
        const checkAccount = await accountService.getAccountDetails(account_id_param)
            .then(account => account?true:false)
            .catch(()=>false);
        const check_status_type = ["SENDER", "RECEIVER", "CAR TRIP"].includes(status_type_param)?true:false;

        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);

        if(checkAccount && check_status_type && checkAllStatusFalse === false){
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = status_type_param;
            formData.status_completed = false;

            //tạo status
            const status = await new Status(formData).save()
                .then(data => mongooseToObject(data))
                .catch(err => err)
            switch (status_type_param) {
                case "RECEIVER":
                    //tạo receiver status
                    status.detail = await receiverStatusService.addReceiverStatus(status._id.toString(), object);
                    //update role account
                    accountService.accountUpdate_roleId_byRoleName(account_id_param, 'receiver');
                    break;
                // case "SENDER":
                //     console.log(status._id);
                //     //tạo receiver status
                //     receiverStatusService.addReceiverStatus(status._id.toString(), object)
                //     //update role account
                //     accountService.accountUpdate_roleId_byRoleName(account_id_param, 'receiver');
                //     break;
                // case "CAR TRIP":
                //     console.log(status._id);
                //     //tạo receiver status
                //     receiverStatusService.addReceiverStatus(status._id.toString(), object)
                //     //update role account
                //     accountService.accountUpdate_roleId_byRoleName(account_id_param, 'receiver');
                //     break;
                default:
                    break;
            }
            return status;
        }
        else 
            return null;
    }

    // OK
    getStatusList = async() => {
        const status_list = await Status.find({})
            .then(list => {
                return multiplemongooseToObject(list);
            });
        const status_list_map = await Promise.all(status_list.map(async(obj)=>{
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                // case "RECEIVER":
                
                //     break;
                // case "CAR TRIP":
                
                //     break;
                default:
                    break;
            }
            return obj;
        }))
        .then(data => data);
        return status_list_map;
    }
    //OK
    // lấy danh sách status theo loại
    getStatusListByType = async (status_type_param) => {
        const status_list = await Status.find({status_type: status_type_param})
            .then(status => multiplemongooseToObject(status)); 
        const status_list_map = await Promise.all(status_list.map(async(obj)=>{
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                // case "RECEIVER":
                
                //     break;
                // case "CAR TRIP":
                
                //     break;
                default:
                    break;
            }
            return obj;
        }))
        .then(data => data);
        return status_list_map;   
    }

    //OK
    //lấy ra tất cả thông tin một thông tin(receiver/ sender/car trip) essential cuả status
    getEssentialOfStatus = async(status_id_param) =>{
        const status =  await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status));
        let status_details;
        switch (status.status_type) {
            case "RECEIVER":
                status_details = await receiverStatusService.getReceiverStatusDetail_status_id(status_id_param);
                break;
            // case "RECEIVER":
            
            //     break;
            // case "CAR TRIP":
            
            //     break;
            default:
                break;
        }
        return status_details;
    }

    //OK
    getStatusDetails = async(status_id_param)=>{
        const status = await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status));
        const status_details = await this.getEssentialOfStatus(status_id_param);
        const object = {...status, detail: {... status_details}};
        return object;
    }

    updateStatus = async(status_id_param,object) =>{
        return await Status.findByIdAndUpdate({_id: status_id_param}, object)
            .then(status => mongooseToObject(status));
    }

    
    //OK
    deleteStatus = async (status_id_param) =>{
        const status = await this.getStatusDetails(status_id_param);
        switch (status.status_type) {
            case "RECEIVER":
                // hàm này sẽ xóa status, receiver_status, picture, chuyển account thành user
                // status.detail._id.toString() chuyển new ObjectID(".....") về ......
                // console.log("receiver_status: ", status.detail._id.toString());
                await receiverStatusService.deleteReceiverStatus(status.detail._id.toString());
                break;
            // case "RECEIVER":
            
            //     break;
            // case "CAR TRIP":
            
            //     break;
            default:
                break;
        } 
        return status;
    }

    
}

module.exports = new StatusService();