const express = require('express');
const router = express.Router();
const authmiddle = require('../middlewares/auth');

const statusController = require('../controllers/StatusController.js');

router.post('/:account_id_pr/:status_type_pr/create', statusController.addStatus);
router.get('/status_list', statusController.getAllStatus);
router.get('/status_list/:status_type_pr', statusController.getAllStatusByType);
router.get('/details/:status_id', statusController.getStatusByID);
// // không cho phép update UserID
// // roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/update/:status_id_pr', statusController.updateStatus);
router.post('/delete/:status_id', statusController.deleteStatus);





module.exports = router;