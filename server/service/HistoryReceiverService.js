const ReceiverStatus = require('../models/Receiver_Status');
const Status = require('../models/Status');
const CarStatus = require('../models/Car_Status');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const HistoryReceiver = require('../models/History_Receiver');
const statusService = require('./StatusService');
const receiverStatusService = require('./ReceiverStatusService');
const accountService = require('./AccountService');
const userService = require('./UserService');
const handlePagination = require('../middlewares/handlePagination');
const carStatusService =require('../service/CarStatusService');
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
            .then(datas => multiplemongooseToObject(datas))
            .catch(err => null);
        return receiver_status.length > 0?true:false ; 
    }

    //kiểm tra có receiver_status trong history: check confirm 2/2 và complete_status trong bảng status
    checkDataHistoryReceiver = async(receiver_status_id_pr) =>{
        const check = await HistoryReceiver.find({receiver_status_id: receiver_status_id_pr})
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
            console.log(checkNoDataHistoryReceiver,checkDataHistoryReceiver,checkCompleteStatus)
            if(!checkNoDataHistoryReceiver ||  (checkDataHistoryReceiver && !checkCompleteStatus)){
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

    getAllHistoryRegisterReceiverByReceiverStatusID =  async (receiver_status_id,_limit,_page) =>{
        const totalRows = await HistoryReceiver.count({receiver_status_id: receiver_status_id});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_receiver_list  = await HistoryReceiver.find({receiver_status_id: receiver_status_id})
            .skip(start)
            .limit(pagination._limit)
            .then(data => multiplemongooseToObject(data))
            .catch(err => err);
        return{
            history_receiver_list: history_receiver_list,
            pagination
        }
    }

    cancleRegisterReceiver = async (car_status_id, receiver_status_id) =>{
        //kiêm tra có data hay không
        const historyReceiverData = await HistoryReceiver.findOne({car_status_id: car_status_id, receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: false})
            .then(async history =>{
                if(!history)
                    return 'NO DATA';
                history = mongooseToObject(history);
                //Kiểm tra đã comfirm 1/2 hoặc 2/2 hay chưa
                //Nếu chưa là 0/2
                if(!history.receiver_confirm && !history.car_confirm)
                {
                    //Xóa
                    return await HistoryReceiver.findByIdAndRemove({_id: history._id})
                        .then(async data => {
                            data = mongooseToObject(data);
                            //update lại trạng thái regis_status của receiver status: false
                            await ReceiverStatus.findByIdAndUpdate({_id: data.receiver_status_id}, {regis_status: false})
                            return data;
                        })
                        .catch(err => err);
                }
                //ngược lại là đã confirm 1/2, 2/2 là đã thực hiện giao dịch
                return 'NOT CANCLE';
            })
        if(historyReceiverData)
            return historyReceiverData
        return null;
    }
    //xử lý status khi tất cả số lượng nhu yếu phẩm = 0
    //- chuyển role car_trip về user
    //- chuyển status_completed thành true
    handleCarStatusWhenOutOfEssential = async (car_status_id) =>{
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data));
        const essentials = car_status.essentials;
        let check_quantity_essentials = false;
        // nếu tất cả essential có số luwognj = 0 thì check sẽ bằng TRUE
        check_quantity_essentials = essentials.every(essential =>{
            return essential.quantity === 0
        })
        if(check_quantity_essentials){
            //chuyển status_completed thành true;
            const status = await Status.findByIdAndUpdate({_id: car_status.status_id},{status_completed: true})
            //chuyển role car_trip về user
            await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user');
            //hoàn thành trả về true
            return true;
        }
        //chưa hoàn thành trả về false;
        return false;
    }

    //Giảm số lượng essential trong sender status, object={essentials:[]}
    reduceQuantityEssentailOfReceiverStatus = async (receiver_status_id, object) =>{
        const receiver_status = await ReceiverStatus.findById({_id: receiver_status_id})
            .then(data => mongooseToObject(data));
        const essentials = receiver_status.essentials;
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
        await ReceiverStatus.findByIdAndUpdate({_id: receiver_status_id},{essentials: essentials_update})
    }

    //Giảm số lượng nhu yếu phẩm của car_status, object={essentials:[]}
    reduceQuantityEssentialInCarStatus = async (car_status_id, object)=>{
        //Tìm kiếm data car status
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        //mảng dùng để giảm số lượng essential của car status
        let essentials_update = [];
        //lấy về số lượng mảng essential của status trước khi cập nhật số lượng essential
        const car_status_essential_list = car_status.essentials;
        //duyệt qua mảng essentials của car_status để giảm số lượng vào mảng essentials_update
        // if(car_status_essential_list.length > 0){
        //mảng essentials đã được update số lưognj
        essentials_update = car_status_essential_list.map(essential =>{
            const essential_id = essential.essential_id;
            let quantity = essential.quantity;
            //lấy ra đối tượng có trùng mã id với phần id phần tử essential
            const object_essential = object.essentials.find(item =>{
                return item.essential_id === essential_id.toString()
            });
            quantity -= object_essential?object_essential.quantity:0
            return {
                essential_id,
                quantity  //giam số lươgnj
            };
        });
        return essentials_update;
        // }
    }
    // lấy về mảng số lượng nhu yếu phẩm hiện tại của chuyến xe
    getEssentialsCurrentOfCar = async(car_status_id) =>{
        const car_status = await CarStatus.findById({_id: car_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        return car_status.essentials;
    }

    // lấy về mảng số lượng nhu yếu phẩm hiện tại của receiver
    getEssentialsCurrentOfReceiver = async(receiver_status_id) =>{
        const receiver_status = await ReceiverStatus.findById({_id: receiver_status_id})
            .then(data => mongooseToObject(data))
            .catch(err => err);
        return receiver_status.essentials;
    }

    confirmReceiverStatusOfCar = async (car_status_id, receiver_status_id, object) =>{
        const historyReceiverData = await HistoryReceiver.findOne({car_status_id: car_status_id, receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: false})
            .then(async history =>{
                //kiểm tra có data hay không
                if(!history)
                    return 'NO DATA';
                if(!history.receiver_confirm && !history.car_confirm)
                {
                    //Nếu có data => update history
                    history = mongooseToObject(history);

                    let essentials_update = [];
                    essentials_update = await this.reduceQuantityEssentialInCarStatus(history.car_status_id, {essentials: object.essentials})
                    
                    //duyệt qua từng phần tử trong mảng xem có số lượng essential nào âm không:
                    // - Nếu nhập quá số lượng hiện có trong car_status thì sau khi update essential trên thì sẽ trả về SỐ ÂM
                    // - Nếu nhập = số lượng hoặc nhỏ hơn hiện có trong status thì sau khi update essential trên thì sẽ trả về số >= 0
                    let check_quantity_essentials = false;
                    if(essentials_update.length > 0){
                        // nếu 1 essential có số luwognj nhỏ hơn 0 thì check sẽ bằng TRUE
                        check_quantity_essentials = essentials_update.some(essential =>{
                            return essential.quantity < 0
                        })
                    }
                    let car_status_update =  null;
                    if(!check_quantity_essentials){
                        object.essentials_current_car = await this.getEssentialsCurrentOfCar(car_status_id).then(data => data);
                        car_status_update = await CarStatus.findByIdAndUpdate({_id: history.car_status_id}, {essentials: essentials_update})
                            .then(car_status_data => mongooseToObject(car_status_data));
                    }    
                    else
                        return 'QUANTITY IS NOT ENOUGH'
                    //nếu có data car status thì update tiếp
                    if(car_status_update){
                        object.car_confirm = true;
                        object.receiver_time = Date.now();
                        object.essentials_current_receiver = await this.getEssentialsCurrentOfReceiver(receiver_status_id).then(data => data);
                        //Trả về giữ liệu cũ
                        return await HistoryReceiver.findByIdAndUpdate({_id: history._id}, object)
                            .then(async data => {
                                data = mongooseToObject(data);
                                //Giảm số lượng essential trong sender_status
                                this.reduceQuantityEssentailOfReceiverStatus(data.receiver_status_id, {essentials: object.essentials})
                                //Xử lý status khi nếu hết nhu yếu phẩm sao khi giao
                                // const status_completed = await this.handleCarStatusWhenOutOfEssential(data.car_status_id);
                                // if(status_completed)
                                //     data.status_completed = status_completed;
                                // else
                                //     data.status_completed = status_completed;
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
        if(historyReceiverData)
            return historyReceiverData
        return null;
    }

    //kiểm tra số lượng essential: + nếu như số lượng essential tất cả < hoặc = 0 thì TRUE
    //                          + nếu như số lượng essential tất cả có 1 số lượng  > 0 thì FALSE
    checkEssentialsQuantityInReceiver = (essentials) =>{
        if(essentials.length > 0){
            return essentials.some(essential =>{
                return essential.quantity > 0;
            })
        }
        return false;
    }
    checkRegisStatusOfReceiverStatus = async (receiver_status_id) =>{
        return await ReceiverStatus.findById({_id: receiver_status_id})
            .then(data =>{
                data = mongooseToObject(data);
                if(data && data.regis_status === true)
                    return true;
                return false;
            })
            .catch(err => err);
    }

    confirmReceiverStatusOfReceiver = async  (car_status_id, receiver_status_id) => {
        const historyReceiverData = await HistoryReceiver.findOne({car_status_id: car_status_id, receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: true})
            .then(async history =>{
                history = mongooseToObject(history);
                if(!history)
                    return 'NO DATA';
                if(!history.receiver_confirm && history.car_confirm){
                    //Nếu có data => update history
                    //kiểm tra status có được đăng ký không
                    if(await this.checkRegisStatusOfReceiverStatus(history.receiver_status_id)){
                        //update history: {receiver_confirm: true};
                        const history_update_data = await HistoryReceiver.findOneAndUpdate({
                                car_status_id: car_status_id, 
                                receiver_status_id: receiver_status_id,
                                receiver_confirm: false, 
                                car_confirm: true
                            },
                            {
                                receiver_confirm: true
                            })
                            .then(data => mongooseToObject(data))
                            .catch(err => err);
                        let receiver_status_data = null;
                        //update regis_status: false trong receiver_status
                        if(history_update_data){
                            if(history_update_data.receiver_status_id){
                                receiver_status_data =  await ReceiverStatus.findOneAndUpdate({_id:history_update_data.receiver_status_id, regis_status: true},{regis_status: false})
                                    .then(data => mongooseToObject(data))
                                    .catch(err => err)
                            }
                        }
                        //update status_completed: + nếu như số lượng essential tất cả < hoặc = 0 thì TRUE
                        //                          + nếu như số lượng essential tất cả có 1 số lượng  > 0 thì FALSE
                        if(receiver_status_data){
                            //kiểm tra số lượng essentials
                            const checkQuantity = this.checkEssentialsQuantityInReceiver(receiver_status_data.essentials);
                            //nếu checkQuantity = true thì update lại statuss_completed: true
                            if(!checkQuantity)
                                await Status.findByIdAndUpdate({_id: receiver_status_data.status_id}, {status_completed: true})
                                    .then(data => mongooseToObject(data))
                            return history;
                        }
                        return 'NO CONFIRM';
                    }
                }
                return 'NO REGISTER'
            })
            .catch(err => err)
        if(historyReceiverData)
            return historyReceiverData
        return null;
    }
    //Notification
    //Lấy ra những status vừa được chuyến xe đăng ký.
    //+ regis_status: true;
    //+ receiver_confirm: false;
    //+ car_confirm: false;
    getAllRegisterReceiverNoConfirm_0_2ByReceiverStatusID = async(receiver_status_id,_limit,_page) =>{
        const totalRows = await HistoryReceiver.count({receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: false});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;
        const history_receiver_list  = await HistoryReceiver.find({receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: false})
            .skip(start)
            .limit(pagination._limit)
            .sort('-createdAt')
            .then(async data =>{
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
                                return account;
                            })
                            .then(async account =>{
                                const user = await userService.getUserByID(account.user_id)
                                    .then(data => data);
                                car_infor.user = user;
                                object.car_infor = car_infor;
                                return history;
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
            history_receiver_list: history_receiver_list,
            pagination
        }
    }


    //Notification
    //lấy tất cả danh sách chưa được xác nhận từ người dùng nhưng đã được xác nhận từ chuyến xe
    //Làm cho phần thông báo của receiver
    getAllHistoryRegisterReceiverNoConfirmByReceiverStatusID =  async (receiver_status_id,_limit,_page) =>{
        const totalRows = await HistoryReceiver.count({receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: true});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_receiver_list  = await HistoryReceiver.find({receiver_status_id: receiver_status_id, receiver_confirm: false, car_confirm: true})
            .skip(start)
            .limit(pagination._limit)
            .sort('-createdAt')
            .then(async data =>{
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
                                return account;
                            })
                            .then(async account =>{
                                const user = await userService.getUserByID(account.user_id)
                                    .then(data => data);
                                car_infor.user = user;
                                object.car_infor = car_infor;
                                return history;
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
            history_receiver_list: history_receiver_list,
            pagination
        }
    }

    //Notification
    //lấy tất cả danh sách được xác nhận từ người dùng và từ chuyến xe
    //Làm cho phần thông báo của receiver
    getAllHistoryRegisterReceiverConfirmByReceiverStatusID =  async (receiver_status_id,_limit,_page) =>{
        const totalRows = await HistoryReceiver.count({receiver_status_id: receiver_status_id, receiver_confirm: true, car_confirm: true});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const history_receiver_list  = await HistoryReceiver.find({receiver_status_id: receiver_status_id, receiver_confirm: true, car_confirm: true})
            .skip(start)
            .limit(pagination._limit)
            .sort('-createdAt')
            .then(async data =>{
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
                                return account;
                            })
                            .then(async account =>{
                                const user = await userService.getUserByID(account.user_id)
                                    .then(data => data);
                                car_infor.user = user;
                                object.car_infor = car_infor;
                                return history;
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
            history_receiver_list: history_receiver_list,
            pagination
        }
    }
}

module.exports = new HistoryReceiverService()