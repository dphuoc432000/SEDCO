const express = require('express');
const router = express.Router();
// const authmiddle = require('../middlewares/auth');
const accountController = require('../controllers/AccountController');

//Đã có hàm regis trong auth.js
// router.post('/store/:user_id_pr/:role_id_pr', accountController.addAccount);
router.get('/list', accountController.getAllAccount);
//lấy chi tiết account theo user_id
router.get('/user_id/:user_id/detail', accountController.getAccountByUserID);
router.get('/:id/detail', accountController.getAccountByID);
// không cho phép update UserID
// roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/:id/update', accountController.updateAccount);
router.post('/:id/delete', accountController.deleteAccount);
router.post("/:account_id/password/update", accountController.updatePassowrd);

module.exports = router;