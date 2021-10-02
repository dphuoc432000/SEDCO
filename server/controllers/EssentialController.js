const {multiplemongooseToObject,mogooseToObject, mongooseToObject} = require('../util/mongoose');
const handleOther = require('./handleOther.js');
const essentialService = require('../service/EssentialService');

class EssentialController{
    
    
    addEssential = async (req, res, next) =>{
        await essentialService.addEssentials(req.body)
            .then(data => {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(err => next(err));
    }

    getAllEssential = async (req, res, next) =>{
        await essentialService.getAllEssential()
            .then(datas => {
                if(datas)
                    return res.json(datas);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(err => next(err));
    }

    deleteEssential = async (req, res, next) =>{
        await essentialService.deleteEssential(req.params.essential_id_pr)
            .then(data=> {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập essential_id", null))
            })
            .catch(err => next(err));
    }

    getEssentialDetail = async (req, res, next) =>{
        await essentialService.getEssentialDetail(req.params.essential_id_pr)
            .then(data=> {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập essential_id", null))
            })
            .catch(err => next(err));
    }

    updateEssential = async(req, res, next) =>{
        await essentialService.updateEssential(req.params.essential_id_pr, req.body)
            .then(data=> {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(err => next(err));
    }
}

module.exports = new EssentialController();