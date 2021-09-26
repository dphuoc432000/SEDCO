const express = require('express');
const router = express.Router();

// const authmiddle = require('../middlewares/auth');

const essentialController = require('../controllers/EssentialController');

router.post('/store', essentialController.addEssential);
router.get('/essential_list', essentialController.getAllEssential);
// router.get('/details/:id', accountController.getAccountByID);
// // không cho phép update UserID
// // roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
// router.post('/update/:id', accountController.updateAccount);
// router.post('/delete/:id', accountController.deleteAccount);
// router.post('/sign_in', accountController.getAccountByUsernameAndPassword);


module.exports = router;