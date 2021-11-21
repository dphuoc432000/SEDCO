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
        form_data.car = JSON.parse(form_data.car);
        console.log('formdata',form_data)
        await carStatusService.updateCarStatusInfor(req.params.car_status_id_pr, form_data)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Không tìm thấy car status", null));
            })
            .catch(err => next(err))
    }

    registerSenderStatus = async (req, res, next) =>{
        await historySenderService.carRegisterSender(req.params.car_status_id_pr, req.params.sender_status_id_pr)
            .then(data =>{
                if(data && data !== 'NOT COMPLETED')
                    return res.json(data)
                else if(data === 'NOT COMPLETED')
                    return res.status(400).json(handleOther.errorHandling("Giao dịch của chuyến xe và người gửi chưa hoàn thành", null))
                else
                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy car_status hoặc sender_status. Hoặc car_status đã hoàn thành. ", null))
            })
            .catch(err => next(err))
    }

    registerReceiverStatus = async (req, res, next) =>{
        await historyReceiverService.carRegisterReceiver(req.params.car_status_id_pr, req.params.receiver_status_id_pr)
            .then(data =>{
                if(data && data !== 'NOT COMPLETED')
                    return res.json(data)
                else if(data === 'NOT COMPLETED')
                    return res.status(400).json(handleOther.errorHandling("Giao dịch của chuyến xe và người nhận chưa hoàn thành", null))
                else
                    return res.status(400).json(handleOther.errorHandling("Không tìm thấy car_status hoặc receiver_status. Hoặc car_status đã hoàn thành. ", null))
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
}

module.exports = new CarStatusController();