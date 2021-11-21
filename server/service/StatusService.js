const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');
const Status = require('../models/Status');
const accountService = require('./AccountService.js');
const userService = require('./UserService')
const receiverStatusService = require('./ReceiverStatusService');
const senderStatusService = require("./SenderStatusService");
const carStatusService = require('./CarStatusService');
const vehicleCensorshipService = require('../service/VehicleCensorshipService');
const roleService = require('./RoleService')
const { getSenderStatusDetail } = require('./SenderStatusService');

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
            console.log(statusList)
        if(statusList.length === 0)
            return false;
        return true;
    }

    check_account = async(account_id_param) =>{
        const account = await accountService.getAccountDetails(account_id_param)
            .then(account => account)
            .catch(err => null)

        return account?true:false;
    }

    check_status_type = async (status_type_param) =>{
        return ["SENDER", "RECEIVER", "CAR_TRIP"].includes(status_type_param)?true:false;
    }
    // OK
    // Status sẽ được add khi tất cả status trước đó đã được hoàn thành --> status_completed: true;
    addStatus = async (account_id_param, status_type_param, object) => {
        // const checkAccount = await accountService.getAccountDetails(account_id_param)
        //     .then(account => account?true:false)
        //     .catch(()=>false);
        
        //lấy account
        const account = await accountService.getAccountDetails(account_id_param)
            .then(account => account)
            .catch(err => null)

        const checkAccount = account?true:false;

        const check_status_type = ["SENDER", "RECEIVER", "CAR_TRIP"].includes(status_type_param)?true:false;
        // console.log("32", check_status_type)
        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);

        if(checkAccount && check_status_type && checkAllStatusFalse === false){
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = status_type_param;
            formData.status_completed = false;
            //tạo status
            return await new Status(formData).save()
                .then(async data => {
                    let status = mongooseToObject(data);
                    const staus_id = status._id;
                    switch (status_type_param) {
                        case "RECEIVER":
                            //tạo receiver status
                            status.detail = await receiverStatusService.addReceiverStatus(staus_id.toString(), object)
                                .catch(err => err);
                            //update role account
                            await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'receiver')
                                .catch(err => err);
                            break;
                        case "SENDER":
                            //tạo receiver status
                            status.detail = await senderStatusService.addSenderStatus(staus_id.toString(), object)
                                .catch(err => err);
                            //update role account
                            await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'sender')
                                .catch(err => err);
                            break;
                        case "CAR_TRIP":
                            //tạo receiver status
                            status.detail = await carStatusService.addCarStatus(staus_id, account.user_id, object)
                                .catch(err => err);
                            //update role account
                            await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'car_trip')
                                .catch(err => err);
                            break;
                        default:
                            break;
            
                    }
                    return status;
                })
                .catch(err => err)
        }
        else 
            return null;
    }

    addStatusCarTrip = async(account_id_param, object) => {
        const check_account = await this.check_account(account_id_param);
        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);
        // console.log(check_account, checkAllStatusFalse)
        if(check_account && checkAllStatusFalse === false){
            //tạo status
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = 'CAR_TRIP';
            formData.status_completed = false;
            return await new Status(formData).save()
                .then(async data => {
                    let status = mongooseToObject(data);
                    const staus_id = status._id;
                    const account = await accountService.getAccountDetails(account_id_param)
                        .catch(err => null)
                    const user_id = account.user_id;
                    //tạo car status
                    status.detail = await carStatusService.addCarStatus(staus_id, user_id, object)
                        .catch(err => err);

                    //lưu hình ảnh vehicle_ship
                    const vehicle_censorship = await vehicleCensorshipService.getVehicleCensorshipByUserId(user_id)
                        .catch(err => err);
                    //nếu đã có hình ảnh của tài xế rồi thì cập nhật hình ảnh
                    console.log('vehicle_censorship', vehicle_censorship)
                    if(vehicle_censorship)
                        status.vehicle_censorship = await vehicleCensorshipService.updateVehicleCensorshipByUserIDForUserInfor(user_id, object.file_images)
                            .catch(err => err);
                    else
                        status.vehicle_censorship = await vehicleCensorshipService.addVehicleCensorship(user_id,object.file_images)
                            .then(data => data)
                            .catch(err => err);
                    //cập nhật role thành car_trip
                    await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'car_trip')
                        .catch(err => err);
                    console.log(status)
                    return status;
                })
                .catch(err => err);
        }
        return null;
    }

    addStatusSender = async(account_id_param, object) =>{
        const check_account = await this.check_account(account_id_param);
        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);
        if(check_account && checkAllStatusFalse === false){
            //tạo status
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = 'SENDER';
            formData.status_completed = false;
            return await new Status(formData).save()
                .then(async data => {
                    let status = mongooseToObject(data);
                    const staus_id = status._id;
                            //tạo receiver status
                    status.detail = await senderStatusService.addSenderStatus(staus_id, object)
                        .catch(err => err);
                    //update role account
                    await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'sender')
                        .catch(err => err);
                    return status;
                })
                .catch(err => err);
        }
        return null;
    }

    addStatusReceiver = async(account_id_param, object) =>{
        const check_account = await this.check_account(account_id_param);
        const checkAllStatusFalse = await this.check_accID_has_status_no_complete(account_id_param);
        if(check_account && checkAllStatusFalse === false){
            //tạo status
            const formData = {};
            formData.account_id = account_id_param;
            formData.status_type = 'RECEIVER';
            formData.status_completed = false;
            return await new Status(formData).save()
                .then(async data => {
                    let status = mongooseToObject(data);
                    const staus_id = status._id;
                            //tạo receiver status
                    status.detail = await receiverStatusService.addReceiverStatus(staus_id, object)
                        .catch(err => err);
                    //update role account
                    await accountService.accountUpdate_roleId_byRoleName(account_id_param, 'receiver')
                        .catch(err => err);
                    return status;
                })
                .catch(err => err);
        }
        return null;
    }

    // OK
    getStatusList = async() => {
        const status_list = await Status.find({})
            .then(list => {
                return multiplemongooseToObject(list);
            });
        const status_list_map = await Promise.all(status_list.map(async(obj)=>{
            const account = await accountService.getAccountDetails(obj.account_id)
            const user = await userService.getUserByID(account.user_id);
            obj.user = user;
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "SENDER":
                    await senderStatusService.getSenderStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break
                case "CAR_TRIP":
                    await carStatusService.getCarStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                default:
                    break;
            }
            return obj;
        }))
        .then(data => data);
        return status_list_map;
    }
    //Lấy StatusList Chưa hoàn thành completed = false
    getStatusListNoComplete = async() => {
        const status_list = await Status.find({status_completed: false})
            .then(list => {
                return multiplemongooseToObject(list);
            });
        const status_list_map = await Promise.all(status_list.map(async(obj)=>{
            const account = await accountService.getAccountDetails(obj.account_id)
            const user = await userService.getUserByID(account.user_id);
            obj.user = user;
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "SENDER":
                    await senderStatusService.getSenderStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break
                case "CAR_TRIP":
                    await carStatusService.getCarStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
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
            const account = await accountService.getAccountDetails(obj.account_id)
            const user = await userService.getUserByID(account.user_id);
            obj.user = user;
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "SENDER":
                    await senderStatusService.getSenderStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "CAR_TRIP":
                    await carStatusService.getCarStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                default:
                    break;
            }
            return obj;
        }))
        .then(data => data);
        return status_list_map;   
    }
    // lấy danh sách status theo loại chưa hoàn thành
    getStatusListByTypeNoComplete = async (status_type_param) => {
        const status_list = await Status.find({status_type: status_type_param, status_completed: false})
            .then(status => multiplemongooseToObject(status)); 
        const status_list_map = await Promise.all(status_list.map(async(obj)=>{
            const account = await accountService.getAccountDetails(obj.account_id)
            const user = await userService.getUserByID(account.user_id);
            obj.user = user;
            switch (obj.status_type) {
                case "RECEIVER":
                    await receiverStatusService.getReceiverStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "SENDER":
                    await senderStatusService.getSenderStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                case "CAR_TRIP":
                    await carStatusService.getCarStatusDetail_status_id(obj._id.toString())
                        .then((data) =>{
                            obj.detail = data;
                        })
                    break;
                default:
                    break;
            }
            return obj;
        }))
        .then(data => data);
        return status_list_map;   
    }
    // ok
    //lấy ra tất cả thông tin một thông tin(receiver/ sender/car trip) essential cuả status
    getEssentialOfStatus = async(status_id_param) =>{
        const status =  await Status.findById({_id:status_id_param})
            .then(status => mongooseToObject(status))
            .catch(err => err);
        let status_detail;
        if(status)
            switch (status.status_type) {
                case "RECEIVER":
                    status_detail = await receiverStatusService.getReceiverStatusDetail_status_id(status_id_param);
                    break;
                case "SENDER":
                    status_detail = await senderStatusService.getSenderStatusDetail_status_id(status_id_param);
                    break;
                case "CAR_TRIP":
                    status_detail = await carStatusService.getCarStatusDetail_status_id(status_id_param);
                    break;
                default:
                    break;
            }
        return status_detail;
    }

    // ok
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

    getStatusDetailByAccountID = async(account_id_param)=>{
        const account = await accountService.getAccountDetails(account_id_param);
        let role;
        if(account){
            role = await roleService.getRoleByID(account.role_id);
            if(role.role_name !== 'user'){
                const status = await Status.findOne({account_id: account_id_param, status_completed: false})
                    .then(status => mongooseToObject(status))
                    .catch(err=>err);
                let status_detail;
                let object;
                if(status){
                    status_detail = await this.getEssentialOfStatus(status._id);
                    object = {...status, detail: {...status_detail}};
                }
                else
                    object = null; 
                return object;
            }
            return 'NO PERMISSION';
        }
        return null;
    }

    updateStatus = async(status_id_param,object) =>{
        return await Status.findByIdAndUpdate({_id: status_id_param}, object)
            .then(status => mongooseToObject(status))
            .catch(err => err);
    }

    
    //OK
    deleteStatus = async (status_id_param) =>{
        const status = await this.getStatusDetail(status_id_param);
        if(status){
            const status_type = status.status_type;
            // console.log("status", status)
            switch (status_type) {
                case "SENDER":
                    await senderStatusService.deleteSenderStatus(status.detail._id);// hàm này sẽ xóa status, receiver_status, picture, chuyển account thành user
                    break;
                case "RECEIVER":
                    // status.detail._id.toString() chuyển new ObjectID(".....") về ......
                    // console.log("receiver_status: ", status.detail._id.toString());
                    // await receiverStatusService.deleteReceiverStatus(status.detail._id.toString());// hàm này sẽ xóa status, receiver_status, picture, chuyển account thành user
                    await receiverStatusService.deleteReceiverStatus(status.detail._id);
                    break;
                case "CAR_TRIP":
                    await carStatusService.deleteCarStatus(status.detail._id);
                        break;
                default:
                    break;
            }
        }
            // console.log(status);
        return status;
    }

    
}

module.exports = new StatusService();