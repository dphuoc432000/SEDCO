const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const reportController = require('../controllers/ReportController');

router.post('/:account_id_pr/:status_id_pr/create', authmiddleware.check_login, authmiddleware.checkRole(['user','sender','receiver','car_trip']), reportController.addReport)
router.get('/list/filter', reportController.getReportList_have_search_filter);
module.exports = router;    