const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');
const statusController = require('../controllers/StatusController.js');

//thêm mới status bao gồm tạo status, status detail, đổi role user theo loại status và lưu hình
router.post('/:account_id_pr/:status_type_pr/create', authmiddleware.check_login, authmiddleware.check_user, uploadFile('uploads/status').single('picture'),statusController.addStatus);
router.get('/status_list', statusController.getAllStatus);
router.get('/status_list/:status_type_pr', statusController.getAllStatusByType);
router.get('/details/:status_id', statusController.getStatusByID);
// // không cho phép update UserID
// // roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/update/:status_id_pr', statusController.updateStatus);
//xóa status bao gồm xóa status, status detail, đổi role user thành user và xóa hình 
router.post('/delete/:status_id_pr', statusController.deleteStatus);

module.exports = router;