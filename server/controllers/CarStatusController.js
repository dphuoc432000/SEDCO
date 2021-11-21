const carStatusService = require('../service/CarStatusService');
const handleOther = require('./handleOther');
const historySenderService = require('../service/HistorySenderService');
const historyReceiverService = require('../service/HistoryReceiverService');
const pagination = require("../middlewares/pagination");

class CarStatusController{

    updateCarStatusInfor = async (req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        // console.log(form_data)
        await carStatusService.updateCarStatusInfor(req.params.car_status_id_pr, form_data)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Không tìm thấy car status", null));
            })
            .catch(err => next(err))
    }

    registerSenderStatus = async (req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data)
                    return await historySenderService.carRegisterSender(req.params.car_status_id_pr, req.params.sender_status_id_pr)
                        .then(data =>{
                            if(data && data !== 'NOT COMPLETED')
                                return res.json(data)
                            else if(data === 'NOT COMPLETED')
                                return res.status(400).json(handleOther.errorHandling("Giao dịch của chuyến xe và người gửi chưa hoàn thành", null))
                            else
                                return res.status(400).json(handleOther.errorHandling("Không tìm thấy car_status hoặc sender_status. Hoặc car_status đã hoàn thành. ", null))
                        })
                        .catch(err => next(err))
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }

    registerReceiverStatus = async (req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data)
                    return await historyReceiverService.carRegisterReceiver(req.params.car_status_id_pr, req.params.receiver_status_id_pr)
                        .then(data =>{
                            if(data && data !== 'NOT COMPLETED')
                                return res.json(data)
                            else if(data === 'NOT COMPLETED')
                                return res.status(400).json(handleOther.errorHandling("Giao dịch của chuyến xe và người nhận chưa hoàn thành", null))
                            else
                                return res.status(400).json(handleOther.errorHandling("Không tìm thấy car_status hoặc receiver_status. Hoặc car_status đã hoàn thành. ", null))
                        })
                        .catch(err => next(err))
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }

    //Lấy ra những người đã được chuyến xe đăng ký nhưng chưa nhận nhu yếu phẩm(chưa click nut xác nhận)
    //Điều kiện lọc:
    //- Có data trong history_sender
    //- Chưa được 2/2 confirm (confirm 0/2)
    getAllRegisterSenderNoConfirm_0_2 = async(req, res, next) =>{
        await historySenderService.getAllRegisterSenderNoConfirm_0_2(req.params.car_status_id_pr)
            .then(data =>{
                if(data){
                    const datas = pagination(data, req.query._limit, req.query._page);
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập car_status_id", null));
            })
            .catch(err => next(err))
    }

    //Lấy ra những người đã được chuyến xe đăng ký nhưng chưa gủi nhu yếu phẩm(chưa click nut xác nhận)
    //Điều kiện lọc:
    //- Có data trong history_receiver
    //- Chưa được 2/2 confirm (confirm 0/2)
    getAllRegisterReceiverNoConfirm_0_2 = async(req, res, next) =>{
        await historyReceiverService.getAllRegisterReceiverNoConfirm_0_2(req.params.car_status_id_pr)
            .then(data =>{
                if(data){
                    const datas = pagination(data, req.query._limit, req.query._page);
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập car_status_id", null));
            })
            .catch(err => next(err))
    }
    //cancle regist of car trip for sender
    cancleRegisterSender = async(req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data)
                    return await historySenderService.cancleRegisterSender(req.params.car_status_id_pr, req.params.sender_status_id_pr)
                        .then(data =>{
                            if(data){
                                if(data === 'NO DATA')
                                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy dữ liệu.", null));
                                if(data === 'NOT CANCLE')
                                    return res.status(400).json(handleOther.errorHandling("Không thể hủy đăng ký vì chuyến xe đã thực hiện và xác nhận giao địch.", null));
                                return res.json(data);
                            }
                            return res.status(400).json(handleOther.errorHandling("Lỗi", null));
                        })
                        .catch(err => next(err))
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }

    cancleRegisterReceiver = async(req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data)
                    return await historyReceiverService.cancleRegisterReceiver(req.params.car_status_id_pr, req.params.receiver_status_id_pr)
                        .then(data =>{
                            if(data){
                                if(data === 'NO DATA')
                                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy dữ liệu.", null));
                                if(data === 'NOT CANCLE')
                                    return res.status(400).json(handleOther.errorHandling("Không thể hủy đăng ký vì chuyến xe đã thực hiện và xác nhận giao địch.", null));
                                return res.json(data);
                            }
                            return res.status(400).json(handleOther.errorHandling("Lỗi", null));
                        })
                        .catch(err => next(err));
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }

    confirmSenderStatusOfCar = async(req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data){
                    const formData = req.body;
                    return await historySenderService.confirmSenderStatusOfCar(req.params.car_status_id_pr, req.params.sender_status_id_pr, formData)
                        .then(data =>{
                            if(data){
                                if(data === 'NO DATA')
                                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy dữ liệu.", null));
                                else if(data === 'NOT CONFIRM')
                                    return res.status(400).json(handleOther.errorHandling("Không thể xác thực vì người dùng đang trong quá trình giao dịch.", null));
                                else if(data === 'NO UPDATE CAR_STATUS')
                                    return res.status(400).json(handleOther.errorHandling("Không thể cập nhật số lượng trong car_status", null));
                                return res.json(data);
                            }
                            return res.status(400).json(handleOther.errorHandling("Lỗi", null));
                        })
                        .catch(err => next(err));
                }       
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }

    confirmReceiverStatusOfCar = async(req, res, next) =>{
        await carStatusService.checkCensorship(req.params.car_status_id_pr)
            .then(async data =>{
                if(data){
                    const formData = req.body;
                    return await historyReceiverService.confirmReceiverStatusOfCar(req.params.car_status_id_pr, req.params.receiver_status_id_pr, formData)
                        .then(data =>{
                            if(data){
                                if(data === 'NO DATA')
                                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy dữ liệu.", null));
                                else if(data === 'NOT CONFIRM')
                                    return res.status(400).json(handleOther.errorHandling("Không thể xác thực vì người dùng đang trong quá trình giao dịch.", null));
                                else if(data === 'QUANTITY IS NOT ENOUGH')
                                    return res.status(400).json(handleOther.errorHandling("Không đủ số lượng.", null));
                                else if(data === 'NO UPDATE CAR_STATUS')
                                    return res.status(400).json(handleOther.errorHandling("Không thể cập nhật số lượng trong car_status", null));
                                return res.json(data);
                            }
                            return res.status(400).json(handleOther.errorHandling("Lỗi", null));
                        })
                        .catch(err => next(err));
                }       
                return res.status(400).json(handleOther.errorHandling("Chuyến xe chưa được kiểm duyệt!", null));   
            })
            .catch(err => next(err))
    }
}

module.exports = new CarStatusController();