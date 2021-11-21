const Report = require('../models/Report');
const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const Status = require('../models/Status');
const Account = require('../models/Account');
const handlePagination = require('../middlewares/handlePagination');
const mongoose = require('mongoose')
class ReportService {
    checkStatus = async (status_id)=>{
        return await Status.findById({_id:status_id})
            .then(data => {
                if(data)
                    return true;
                return false;
            })
            .catch(err => false);
    }

    checkAccount = async (account_id) =>{
        return await Account.findById({_id: account_id})
            .then(data => data?true:false)
            .catch(err => false);
    }

    addReport = async(object)=>{
        const {status_id, account_id} = object;
        const checkStatus = await this.checkStatus(status_id);
        const checkAccount = await this.checkAccount(account_id)
        if(checkAccount && checkStatus){
            const report = new Report(object);
            return await report.save()
                .then(data => mongooseToObject(data) )
                .catch(err => err);
        }
        return null;
    }
    //Lấy tất cả bài report có thể search (account_id, status_id) hoặc lọc theo filter(mới nhất, cũ nhất)
    getReportList_have_search_filter = async(filter, _limit, _page) =>{
        const totalRows = await Report.count({
            // $and: [{$or: [{account_id: new mongoose.Types.ObjectId(search_text)},{status_id: search_text}]}]
        });
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const report_list = await Report.find({
            // $and: [
            //     {
            //         $or: [
            //                 {account_id: search_text},
            //                 {status_id: search_text},
            //                 {}
            //             ]
            //     }
            // ]
        })  .sort(`${filter.sort?filter.sort:''}createdAt`)
            .skip(start)
            .limit(pagination._limit)
            .then(data => multiplemongooseToObject(data))
            .catch(err => err);
        
        return{
            report_list,
            pagination
        }
    }
}

module.exports = new ReportService();