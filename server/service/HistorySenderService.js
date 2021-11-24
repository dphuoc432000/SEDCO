const SenderStatus = require('../models/Sender_Status');
const Status = require('../models/Status');
const CarStatus = require('../models/Car_Status');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const HistorySender = require('../models/History_Sender');
const statusService = require('./StatusService');
const senderStatusService = require('./SenderStatusService');
const accountService = require('./AccountService');
const userService = require('./UserService');
const handlePagination = require('../middlewares/handlePagination');
const Sender_Status = require('../models/Sender_Status');
const essentialService = require('../service/EssentialService');
const carStatusService =require('../service/CarStatusService');

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
            .then(datas => multiplemongooseToObject(datas))
            .catch(err => null);
        return sender_status.length > 0?true:false ; 
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
            // console.log("check: ", check)
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
            if(!checkNoDataHistorySender ||  (checkDataHistorySender && !checkCompleteStatus)){
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

    // checkDataHistorySenderByCarStatusID_SenderStatusID = (car_status_id, sender_status)
    //cancle regist of car trip for sender
    cancleRegisterSender = async (car_status_id, sender_status_id) =>{
        //kiêm tra có data hay không
        const historySenderData = await HistorySender.findOne({car_status_id: car_status_id, sender_status_id: sender_status_id, sender_confirm: false, car_confirm: false})
            .then(async history =>{
                if(!history)
                    return 'NO DATA';
                history = mongooseToObject(history);
                //Kiểm tra đã comfirm 1/2 hoặc 2/2 hay chưa
                //Nếu chưa là 0/2
                if(!history.sender_confirm && !history.car_confirm)
                {
                    //Xóa
                    return await HistorySender.findByIdAndRemove({_id: history._id})
                        .then(async data => {
                            data = mongooseToObject(data);
                            //update lại trạng thái regis_status của sender status: false
                            await Sender_Status.findByIdAndUpdate({_id: data.sender_status_id}, {regis_status: false})
                            return data;
                        })
                        .catch(err => err);
                }
                //ngược lại là đã confirm 1/2, 2/2 là đã thực hiện giao dịch
                return 'NOT CANCLE';
            })
            .catch(err => err);
        if(historySenderData)
            return historySenderData
        return null;
    }

    //Giảm số lượng essential trong sender status, object={essentials:[]}
    reduceQuantityEssentailOfSenderStatus = async (sender_status_id, object) =>{
        const sender_status = await SenderStatus.findById({_id: sender_status_id})
            .then(data => mongooseToObject(data));
        const essentials = sender_status.essentials;
        let essentials_update = [];
        if(essentials.length > 0){
            essentials_update = essentials.map(essential =>{
                const essential_id = essential.essential_id;
                let quantity = essential.quantity;
                //lấy ra đối tượng có trùng mã id với phần id phần tử essential
                const object_essential = object.essentials.find(item =>{
                    return item.essential_id.toString() === essential_id.toString()
                });
                quantity -= object_essential.quantity?object_essential.quantity:0
                return {
                    essential_id,
                    quantity //cộng dồn số lươgnj
                };
            });
        }
        await SenderStatus.findByIdAndUpdate({_id: sender_status_id},{essentials: essentials_update})
    }

    //Tăng số lượng nhu yếu phẩm trong carStatus, object={essentials:[]}
    increseaQuantityEssentialInCarStatus = async (car_status_id, object)=>{
        //Tìm kiếm data car status
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //mảng dùng để tăng số lượng essential của car status
        let essentials_update = [];
        //lấy về số lượng mảng essential của status trước khi cập nhật số lượng essential
        const car_status_essential_list = car_status.essentials;
        //duyệt qua mảng essentials của car_status để cộng dồn số lượng vào mảng essentials_update
        // if(car_status_essential_list.length > 0){
        //mảng essentials đã được update số lưognj
        essentials_update = car_status_essential_list.map(essential =>{
            const essential_id = essential.essential_id;
            let quantity = essential.quantity;
            //lấy ra đối tượng có trùng mã id với phần id phần tử essential
            let object_essential = object.essentials.find(item =>{
                    return item.essential_id === essential_id.toString();
            });
            quantity += object_essential?object_essential.quantity:0
            return {
                essential_id,
                quantity//cộng dồn số lươgnj
            };
        });
        return essentials_update;
        // }
        //vì khi tạo car_status rồi thì length mặc định sẽ > 0 nên không cần xét trường hợp <= 0
        // return []
    }
    // lấy về mảng số lượng nhu yếu phẩm hiện tại của chuyến xe
    getEssentialsCurrentOfCar = async(car_status_id) =>{
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        return car_status.essentials;
    }

    // lấy về mảng số lượng nhu yếu phẩm hiện tại của sender
    getEssentialsCurrentOfSender = async(sender_status_id) =>{
        const sender_status = await SenderStatus.findById({_id: sender_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        return sender_status.essentials;
    }

    confirmSenderStatusOfCar = async (car_status_id, sender_status_id, object) =>{
        const historySenderData = await HistorySender.findOne({car_status_id: car_status_id, sender_status_id: sender_status_id, sender_confirm: false, car_confirm: false })
            .then(async history =>{
                //kiểm tra có data hay không
                if(!history)
                    return 'NO DATA';
                console.log(history)
                if(!history.sender_confirm && !history.car_confirm){
                    //Nếu có data => update history
                    history = mongooseToObject(history);
                    
                    //tăng số lượng nhu yếu phẩm trong car status
                    let essentials_update = [];
                    essentials_update = await this.increseaQuantityEssentialInCarStatus(history.car_status_id,{essentials: object.essentials})
                    object.essentials_current_car = await this.getEssentialsCurrentOfCar(car_status_id).then(data => data);
                    const car_status_update = await CarStatus.findByIdAndUpdate({_id: history.car_status_id}, {essentials: essentials_update})
                        .then(car_status_data => mongooseToObject(car_status_data));
                    //nếu có data car status thì update tiếp
                    if(car_status_update){
                        object.car_confirm = true;
                        object.sender_time = Date.now();
                        object.essentials_current_sender = await this.getEssentialsCurrentOfSender(sender_status_id).then(data => data);
                        //Trả về giữ liệu cũ
                        return await HistorySender.findByIdAndUpdate({_id: history._id}, object)
                            .then(data =>{
                                data = mongooseToObject(data);
                                //Giảm số lượng essential trong sender_status
                                this.reduceQuantityEssentailOfSenderStatus(data.sender_status_id, {essentials: object.essentials})
                                return data;
                            })
                            .catch(err => err);
                    }
                    return 'NO UPDATE CAR_STATUS';
                }
                //ngược lại là đã confirm 1/2, 2/2 là đã thực hiện giao dịch
                return 'NOT CONFIRM';
            })
            .catch(err => err);
        if(historySenderData)
            return historySenderData
        return null;
    }

    //kiểm tra số lượng essential: + nếu như số lượng essential tất cả < hoặc = 0 thì TRUE
    //                          + nếu như số lượng essential tất cả có 1 số lượng  > 0 thì FALSE
    checkEssentialsQuantityInSender = (essentials) =>{
        if(essentials.length > 0){
            return essentials.some(essential =>{
                return essential.quantity > 0;
            })
        }
        return false;
    }
    checkRegisStatusOfSenderStatus = async (sender_status_id) =>{
        return await SenderStatus.findById({_id: sender_status_id})
            .then(data =>{
                data = mongooseToObject(data);
                if(data && data.regis_status === true)
                    return true;
                return false;
            })
            .catch(err => err);
    }

    confirmSenderStatusOfSender = async  (car_status_id, sender_status_id) => {
        const historySenderData = await HistorySender.findOne({car_status_id: car_status_id, sender_status_id: sender_status_id, sender_confirm: false, car_confirm: true})
            .then(async history =>{
                history = mongooseToObject(history);
                if(!history)
                    return 'NO DATA';
                if(!history.sender_confirm && history.car_confirm){
                    //Nếu có data => update history
                    //kiểm tra status có được đăng ký không
                    if(await this.checkRegisStatusOfSenderStatus(history.sender_status_id)){
                        //update history: {sender_confirm: true};
                        const history_update_data = await HistorySender.findOneAndUpdate({
                                car_status_id: car_status_id, 
                                sender_status_id: sender_status_id,
                                sender_confirm: false, 
                                car_confirm: true
                            },
                            {
                                sender_confirm: true
                            })
                            .then(data => mongooseToObject(data))
                            .catch(err => err);
                        let sender_status_data = null;
                        //update regis_status: false trong sender_status
                        if(history_update_data){
                            if(history_update_data.sender_status_id){
                                sender_status_data =  await SenderStatus.findOneAndUpdate({_id:history_update_data.sender_status_id, regis_status: true},{regis_status: false})
                                    .then(data => mongooseToObject(data))
                                    .catch(err => err)
                            }
                        }
                        //update status_completed: + nếu như số lượng essential tất cả < hoặc = 0 thì TRUE
                        //                          + nếu như số lượng essential tất cả có 1 số lượng  > 0 thì FALSE
                        if(sender_status_data){
                            //kiểm tra số lượng essentials
                            const checkQuantity = this.checkEssentialsQuantityInSender(sender_status_data.essentials);
                            //nếu checkQuantity = true thì update lại statuss_completed: true
                            if(!checkQuantity)
                                await Status.findByIdAndUpdate({_id: sender_status_data.status_id}, {status_completed: true})
                                    .then(data => mongooseToObject(data))
                            return history;
                        }
                        return 'NO CONFIRM';
                    }
                }
                return 'NO REGISTER'
            })
            .catch(err => err)
        if(historySenderData)
            return historySenderData
        return null;
    }
    //Notification
    //Lấy ra những status vừa được chuyến xe đăng ký.
    //+ regis_status: true;
    //+ sender_confirm: false;
    //+ car_confirm: false;
    getAllRegisterSenderNoConfirm_0_2BySenderStatusID =  async (sender_status_id,_limit,_page) =>{
        const totalRows = await HistorySender.count({sender_status_id: sender_status_id, sender_confirm: false, car_confirm: false});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_sender_list  = await HistorySender.find({sender_status_id: sender_status_id, sender_confirm: false, car_confirm: false})
            .skip(start)
            .limit(pagination._limit)
            .sort('-createdAt')
            .then(async data => {
                let histories_return = multiplemongooseToObject(data);
                
                histories_return = await Promise.all(histories_return.map( async history => {
                    const object = {};
                    const car_infor = {};
                    object.history = history;
                    const carStatus_data = await carStatusService.getCarStatusDetail_car_status_id(history.car_status_id)
                        .then(data => data);
                    if(carStatus_data){
                        await statusService.getStatusDetail(carStatus_data.status_id)
                            .then(status =>{
                                car_infor.status = status;
                                
                                return status;
                            })
                            .then(async status =>{
                                const account = await accountService.getAccountDetails(status.account_id)
                                    .then(data => data);
                                car_infor.account = account;
                                return account;
                            })
                            .then(async account =>{
                                const user = await userService.getUserByID(account.user_id)
                                    .then(data => data);
                                car_infor.user = user;
                                object.car_infor = car_infor;
                                return history
                            })
                            .catch(err => err)
                    }
                    else{
                        car_infor.status = null;
                        car_infor.account = null;
                        car_infor.user = null;
                        object.car_infor = car_infor
                    }
                    return object;
                }))
                return histories_return;
            })
            .catch(err => err);
        return{
            history_sender_list: history_sender_list,
            pagination
        }
    }
    //lấy tất cả danh sách chưa được xác nhận từ người dùng nhưng đã được xác nhận từ chuyến xe
    //Làm cho phần thông báo của sender
    getAllHistoryRegisterSenderNoConfirmBySenderStatusID =  async (sender_status_id,_limit,_page) =>{
        const totalRows = await HistorySender.count({sender_status_id: sender_status_id, sender_confirm: false, car_confirm: true});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_sender_list  = await HistorySender.find({sender_status_id: sender_status_id, sender_confirm: false, car_confirm: true})
            .skip(start)
            .limit(pagination._limit)
            .sort('-createdAt')
            .then(async data => {
                let histories_return = multiplemongooseToObject(data);
                
                histories_return = await Promise.all(histories_return.map( async history => {
                    const object = {};
                    const car_infor = {};
                    object.history = history;
                    const carStatus_data = await carStatusService.getCarStatusDetail_car_status_id(history.car_status_id)
                        .then(data => data);
                    if(carStatus_data){
                        await statusService.getStatusDetail(carStatus_data.status_id)
                            .then(status =>{
                                car_infor.status = status;
                                
                                return status;
                            })
                            .then(async status =>{
                                const account = await accountService.getAccountDetails(status.account_id)
                                    .then(data => data);
                                car_infor.account = account;
                                return account;
                            })
                            .then(async account =>{
                                const user = await userService.getUserByID(account.user_id)
                                    .then(data => data);
                                car_infor.user = user;
                                object.car_infor = car_infor;
                                return history
                            })
                            .catch(err => err)
                    }
                    else{
                        car_infor.status = null;
                        car_infor.account = null;
                        car_infor.user = null;
                        object.car_infor = car_infor
                    }
                    return object;
                }))
                return histories_return;
            })
            .catch(err => err);
        return{
            history_sender_list: history_sender_list,
            pagination
        }
    }
}

module.exports = new HistorySenderService();