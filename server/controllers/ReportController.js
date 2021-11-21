const reportService = require('../service/ReportService');
const handleOther = require('./handleOther.js');
class ReportController {
    addReport = async (req, res, next) =>{
        let formData = req.body
        formData = {
            ...formData,
            status_id: req.params.status_id_pr,
            account_id: req.params.account_id_pr
        }

        await reportService.addReport(formData)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id hoặc acoount_id!", null)); 
            })
            .catch(err => next(err))
    }

    getReportList_have_search_filter = async (req, res, next) =>{
        const filter = {
            sort: req.query.sort?req.query.sort:''
        }
        await reportService.getReportList_have_search_filter( filter, req.query._limit, req.query._page)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Lỗi", null)); 
            })
            .catch(err => next(err))
    }
}

module.exports = new ReportController();