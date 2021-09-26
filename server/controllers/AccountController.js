const handleOther = require('./handleOther.js');
const accountService = require('../service/AccountService');
class AccountController{
    //[POST] /accounts/store/:user_id
    addAccount = async (req, res, next) =>{
        const {user_id_pr, role_id_pr} = req.params;
        const formData = req.body;
        await accountService.addAccount(user_id_pr, role_id_pr, formData)
            .then(account => res.json(account))
            .catch(err => res.status(400).json(handleOther.errorHandling("Lỗi trùng username hoặc user_id", err)));  
    }

    //[GET] /api/account/account_list
    getAllAccount = async (req, res, next) => {
        await accountService.getAccountList()
            .then(accounts => res.json(accounts))
            .catch(err => res.status(400).json(handleOther.errorHandling("Lỗi", err)));  
    }

    //[GET] /accounts/details/:id
    getAccountByID = async(req, res, next) => {
        await accountService.getAccountDetails(req.params.id)
            .then(account => res.json(account))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", error)));
    }

    //[POST] /accounts/update/:id
    updateAccount = async(req, res, next) => {
        await accountService.accountUpdate(req.params.id, req.body)
            .then(account => res.json(account))
            .catch(error => res.status(400).json(handleOther.errorHandling('Lỗi nhập account_id', error)));
    }

    //[POST] /accounts/delete/:id
    deleteAccount = async(req, res, next) =>{
        await accountService.deleteAccount(req.params.id)
            .then(account => res.json(account))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", error)));
    }

    getAccountByUsernameAndPassword = async(req, res, next) =>{
        await accountService.getAccountByUsernameAndBPassword(req.body.username, req.body.password)
            .then(account => res.json(account))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập account và password ", error)));
    }
}

module.exports = new AccountController();