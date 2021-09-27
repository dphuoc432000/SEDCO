const path = require('path')

const multer = require('multer');

const uploadFile = (directory) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory)
        },
        filename: function (req, file, cb) {
            const date = new Date();
            cb(null, date.getMonth()+1 +''+ date.getDate() + '' + date.getFullYear() + '' +  + Math.round(Math.random() * 1E9) +'-'+ file.originalname);
        }
    })
    const fileFilter = (req, file, cb) =>{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
    const upload = multer({ 
        storage: storage,
        limits:{
            fieldSize: 1024 * 1024 * 6
        },
        fileFilter 
    });
    return upload;
}



module.exports = uploadFile;