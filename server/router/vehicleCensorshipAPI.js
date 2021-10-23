const express = require('express');
const router = express.Router();
const {uploadVehicleCensorship} = require('../middlewares/upload');
const authmiddleware = require('../middlewares/auth');
const multer = require("multer");

const vehicleCensorshipController = require('../controllers/VehicleCensorshipController');

// image
router.post("/:user_id/create", authmiddleware.check_login,
            authmiddleware.checkRole(["user", "sender", "receiver", "car_trip"]),
            uploadVehicleCensorship('uploads\\vehicle_censorship')
            .fields([{name: 'face_img', maxCount: 1},
                    {name: 'id_card_img_before', maxCount: 1},
                    {name: 'id_card_img_after', maxCount: 1},
                    {name: 'driving_license_img_before', maxCount: 1},
                    {name: 'driving_license_img_after', maxCount: 1},
                    {name: 'test_img_1', maxCount: 1},
                    {name: 'test_img_2', maxCount: 1}]),
            vehicleCensorshipController.addVehicleCensorship)
router.get("/user_id/:user_id/detail", vehicleCensorshipController.getVehicleCensorshipByUserId);

module.exports= router;