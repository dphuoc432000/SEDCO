const path = require('path');
const fs = require('fs');
const multer = require('multer');


const fileFilter = (req, file, cb) =>{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }

const uploadFileInfor = (directory) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let direc = directory + "\\" + req.data._id
            if(!fs.existsSync(direc))
                fs.mkdirSync(direc)
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
            let direc = directory ;
            console.log(req.params.status_type_pr !== undefined);
            // if(req.params.status_type_pr !== "undefine")
            if(["SENDER", "RECEIVER", "CAR TRIP"].includes(req.params.status_type_pr)){
                direc +=  "\\" + req.params.status_type_pr + "\\" + req.data._id;
            }
            else 
                direc += "\\"  + req.data._id;
            if(!fs.existsSync(direc))
                fs.mkdirSync(direc)
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



module.exports = {uploadFileInfor, uploadFileStatus};