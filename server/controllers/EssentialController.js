const {multiplemongooseToObject,mogooseToObject, mongooseToObject} = require('../util/mongoose');
const handleOther = require('./handleOther.js');
const essentialService = require('../service/EssentialService');

class EssentialController{
    
    //[POST] /essential/store/:account_id_pr
    addEssential = async (req, res, next) =>{
        console.log()
        await essentialService.addEssentials(req.body)
            .then(essential => res.json(essential))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error)));
    }

    getAllEssential = async (req, res, next) =>{
        await essentialService.getAllEssential()
            .then(essentials => res.json(essentials))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error)));
    }
}

module.exports = new EssentialController();