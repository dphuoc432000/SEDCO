const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');
const Status = require('../models/Status');
const accountService = require('./AccountService.js');

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
    // Status sẽ được add khi tất cả status trước đó đã được hoàn thành --> status_completed: true;
    addStatus = async (account_id_param,status_type_param, status_completed) => {
        const checkAccount = await accountService.getAccountDetails(account_id_param)
            .then(account => account?true:false)
            .catch(()=>false);
        const check_status_type = ["SENDER", "RECEIVER", "CAR TRIP"].includes(status_type_param)?true:false;

        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);

        if(checkAccount && check_status_type && checkAllStatusFalse === false){
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = status_type_param;
            formData.status_completed = status_completed;
            const status = new Status(formData);
            return status.save()
                .then(data => mongooseToObject(data));
        }
        else 
            return null;
    }

    getStatusList = async() => {
        return await Status.find({})
            .then(status => multiplemongooseToObject(status));
    }

    // lấy danh sách status theo loại
    getStatusListByType = async (status_type_param) => {
        return await Status.find({status_type: status_type_param})
            .then(status => multiplemongooseToObject(status));    
    }

    getStatusDetails = async(status_id_param)=>{
        return await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status));
    }

    updateStatus = async(status_id_param,object) =>{
        return await Status.findByIdAndUpdate({_id: status_id_param}, object)
        .then(status => mongooseToObject(status));
    }
    deleteStatus = async (status_id_param) =>{
        return await Status.findByIdAndRemove({_id: status_id_param})
            .then(status => mongooseToObject(status))
    }
}

module.exports = new StatusService();