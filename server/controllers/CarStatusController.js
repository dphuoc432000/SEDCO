const carStatusService = require('../service/CarStatusService');
const handleOther = require('./handleOther')
class CarStatusController{

    updateCarStatusInfor = async (req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        // console.log(form_data)
        await carStatusService.updateCarStatusInfor(req.params.car_status_id_pr, form_data)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập nhập car_status_id", null));
            })
            .catch(err => next(err))
    }

}

module.exports = new CarStatusController();