const handleOther = require('./handleOther.js');
const accountService = require('../service/AccountService');
class AccountController{
    //[POST] /accounts/store/:user_id
    addAccount = async (req, res, next) =>{
        const {user_id_pr, role_id_pr} = req.params;
        const formData = req.body;
        await accountService.addAccount(user_id_pr, role_id_pr, formData)
            .then(account => {
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi trùng username hoặc user_id", null))
            })
            .catch(err => next(err));  
    }

    //[GET] /api/account/account_list
    getAllAccount = async (req, res, next) => {
        await accountService.getAccountList(req.query._limit, req.query._page)
            .then(accounts => {
                if(accounts)
                    return res.json(accounts);
                return res.status(400).json(handleOther.errorHandling("Lỗi", null))
            })
            .catch(err => next(err));  
    }

    //[GET] /accounts/details/:id
    getAccountByID = async(req, res, next) => {
        await accountService.getAccountDetails(req.params.id)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", null))
            })
            .catch(err => next(err));  
    }

    //[POST] /accounts/update/:id
    updateAccount = async(req, res, next) => {
        await accountService.accountUpdate(req.params.id, req.body)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", null))
            })
            .catch(err => next(err));  
    }

    //[POST] /accounts/:id/delete
    deleteAccount = async(req, res, next) =>{
        await accountService.deleteAccount(req.params.id)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", null))
            })
            .catch(err => next(err));  
    }

    getAccountByUsernameAndPassword = async(req, res, next) =>{
        await accountService.getAccountByUsernameAndBPassword(req.body.username, req.body.password)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập username và password", null))
            })
            .catch(err => next(err));  
    }
    getAccountByUserID = async(req, res, next) =>{
        await accountService.getAccountByUserID(req.params.user_id)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", null))
            })
            .catch(err => next(err));  
    }
    updatePassowrd = async(req, res, next) =>{
        if(req.body.password_old === req.body.password_new)
            return res.status(400).json(handleOther.errorHandling("Mật khẩu mới đã trùng với mật khẩu cũ!", null))
        await accountService.updatePassword(req.params.account_id, req.body.password_old, req.body.password_new)
            .then(account =>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Mật khẩu cũ không chính xác", null))
            })
            .catch(err => next(err));  
    }
}

module.exports = new AccountController();