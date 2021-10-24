const path = require('path');
const fs = require('fs');
const multer = require('multer');

const createDirectory = (direc) =>{
    if(!fs.existsSync(direc))
        fs.mkdirSync(direc, { recursive: true })
}

const fileFilter = (req, file, cb) =>{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
}
const  fileFilterVehicleCensorship = (req, file, cb) =>{
    if (file.fieldname === "face_img") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "id_card_img_before") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "id_card_img_after") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "driving_license_img_before") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "driving_license_img_after") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "test_img_1") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else if (file.fieldname === "test_img_2") {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    else{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
}

const uploadFileInfor = (directory) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let direc = directory + "\\" + req.data._id
            createDirectory(direc)
            cb(null, direc);
        },
        filename: function (req, file, cb) {
            const date = new Date();
            cb(null, date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+ file.originalname);
        }
    })
    
    const upload = multer({ 
        storage: storage,
        limits:{
            fieldSize: 1024 * 1024 * 6
        },
        fileFilter 
    });
    return upload;
}

const uploadFileStatus = (directory) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.originalname){
                let direc = directory ;
                // console.log(req.params.status_type_pr !== undefined);
                // if(req.params.status_type_pr !== "undefine")
                
                //24/10/2021
                // if(["SENDER", "RECEIVER", "CAR_TRIP"].includes(req.params.status_type_pr)){
                //     direc +=  "\\" + req.params.status_type_pr + "\\" + req.data._id;
                // }
                // else 
                direc += "\\"  + req.data._id;
                if(!fs.existsSync(direc))
                    fs.mkdirSync(direc)
                cb(null, direc);
            }
            else{
                cb(null, "")
            }
        },
        filename: function (req, file, cb) {
            // console.log(file);
            if(file.originalname){
                const date = new Date();
                cb(null, date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+ file.originalname);
            }
            else{
                cb(null,"");
            }
        }
    })
    // console.log("multer: ", multer)
    const upload = multer({ 
        storage: storage,
        limits:{
            fieldSize: 1024 * 1024 * 6
        },
        fileFilter 
    });
    return upload;
}

const uploadVehicleCensorship = (directory) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let direc = directory ;
            if (file.fieldname === "face_img") {
                direc +=  "\\" + req.data._id + "\\" + "face_img";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "id_card_img_before") {
                direc +=  "\\" + req.data._id + "\\" + "id_card_img_before";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "id_card_img_after") {
                direc +=  "\\" + req.data._id + "\\" + "id_card_img_after";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "driving_license_img_before") {
                direc +=  "\\" + req.data._id + "\\" + "driving_license_img_before";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "driving_license_img_after") {
                direc +=  "\\" + req.data._id + "\\" + "driving_license_img_after";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "test_img_1") {
                direc +=  "\\" + req.data._id + "\\" + "test_img_1";
                createDirectory(direc);
                cb(null, direc);
            }
            else if (file.fieldname === "test_img_2") {
                direc +=  "\\" + req.data._id + "\\" + "test_img_2";
                createDirectory(direc);
                cb(null, direc);
            }
            else{
                direc +=  "\\" + req.data._id + "\\" + "other";
                createDirectory(direc);
                cb(null, direc);
            }
        },

        filename:(req,file,cb)=>{
            if (file.fieldname === "face_img") {
                const date = new Date();
                cb(null, file.fieldname +  date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "id_card_img_before") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "id_card_img_after") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "driving_license_img_before") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "driving_license_img_after") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "test_img_1") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else if (file.fieldname === "test_img_2") {
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
            else{
                const date = new Date();
                cb(null, file.fieldname + date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+path.extname(file.originalname));
            }
                
        }
    })
    const upload = multer({ 
        storage: storage,
        limits:{
            fieldSize: 1024 * 1024 * 6
        },
        fileFilter: fileFilterVehicleCensorship
    });
    return upload;
}



module.exports = {uploadFileInfor, uploadFileStatus, uploadVehicleCensorship};