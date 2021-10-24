const vehicleCensorshipService = require('../service/VehicleCensorshipService');
const handleOther = require('./handleOther.js');

class VehicleCensorshipController {

    addVehicleCensorship = async(req, res, next) =>{
        const files = req.files;
        const face_img = files.face_img;
        const id_card_img_before = files.id_card_img_before;
        const id_card_img_after = files.id_card_img_after;
        const driving_license_img_before = files.driving_license_img_before;
        const driving_license_img_after = files.driving_license_img_after;
        const test_img_1 = files.test_img_1;
        const test_img_2 = files.test_img_2;
        if(typeof face_img != 'undefined' &&  typeof id_card_img_before != 'undefined' &&  typeof id_card_img_after != 'undefined' 
            && typeof driving_license_img_before != 'undefined'&& typeof driving_license_img_after != 'undefined'&& typeof test_img_1 != 'undefined'
        ){
            const object = {
                face_img : face_img[0].path,
                id_card_img_before : id_card_img_before[0].path,
                id_card_img_after : id_card_img_after[0].path,
                driving_license_img_before : driving_license_img_before[0].path,
                driving_license_img_after : driving_license_img_after[0].path,
                test_img_1 : test_img_1[0].path,
            }
            if(typeof test_img_2 != 'undefined')
                object.test_img_2 = test_img_2[0].path
            return await vehicleCensorshipService.addVehicleCensorship(req.params.user_id, object)
                .then(data =>{
                    if(data)
                        return res.json(data);
                    return res.status(400).json(handleOther.errorHandling("Lỗi user_id hoặc các file.", null));  
                })
                .catch(err => next(err))
        }
        return res.status(400).json(handleOther.errorHandling("Lỗi các file.", null))
    }

    getAllVehicleNoCensorship = async (req, res, next) =>{
        await vehicleCensorshipService.getAllVehicleNoCensorship()
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi", null)); 
            })
            .catch(err => next(err))
    }
    getVehicleCensorshipByUserId = async (req, res, next) =>{
        await vehicleCensorshipService.getVehicleCensorshipByUserId(req.params.user_id)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", null)); 
            })
            .catch(err => next(err))
    }
}

module.exports = new VehicleCensorshipController()