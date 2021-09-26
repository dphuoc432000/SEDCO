const express = require('express');
const router = express.Router();

// const authmiddle = require('../middlewares/auth');

const accountController = require('../controllers/AccountController');

router.post('/store/:user_id_pr/:role_id_pr', accountController.addAccount);
router.get('/account_list', accountController.getAllAccount);
router.get('/details/:id', accountController.getAccountByID);
// không cho phép update UserID
// roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/update/:id', accountController.updateAccount);
router.post('/delete/:id', accountController.deleteAccount);
router.post('/sign_in', accountController.getAccountByUsernameAndPassword);


module.exports = router;