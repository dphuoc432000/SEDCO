const express = require('express');
const router = express.Router();
// const authmiddle = require('../middlewares/auth');
const essentialController = require('../controllers/EssentialController');

router.post('/store', essentialController.addEssential);
router.get('/list', essentialController.getAllEssential);
router.post('/:essential_id_pr/update', essentialController.updateEssential);
router.get('/:essential_id_pr/detail', essentialController.getEssentialDetail);
router.post('/:essential_id_pr/delete', essentialController.deleteEssential);

module.exports = router;