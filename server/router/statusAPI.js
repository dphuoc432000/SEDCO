const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');
const statusController = require('../controllers/StatusController.js');
const multer = require("multer");

//thêm mới status bao gồm tạo status, status detail, đổi role user theo loại status và lưu hình
// router.post('/:account_id_pr/:status_type_pr/create', authmiddleware.check_login, authmiddleware.check_user_create_status, uploadFile.uploadFileStatus('uploads/status').single('picture'), statusController.addStatus); //OK
router.get('/list', authmiddleware.check_login,authmiddleware.checkRole(["user", "sender", "receiver", "car_trip"]), statusController.getAllStatus);//OK (Pagination)
router.get('/:status_type_pr/list', statusController.getAllStatusByType);//OK
router.get('/:status_id/detail', statusController.getStatusByID);//OK
// // không cho phép update UserID
// // roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/update/:status_id_pr', statusController.updateStatus);
//xóa status bao gồm xóa status, status detail, đổi role user thành user và xóa hình 
router.post('/:status_id_pr/delete', statusController.deleteStatus);//OK
router.get('/account_id/:account_id_pr/detail', statusController.getStatusDetailByAccountID)

module.exports = router;