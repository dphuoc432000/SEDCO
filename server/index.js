const express = require('express');
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const db = require('./config/db/index.js');
const router = require('./router/index.js');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')
const app = express();

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
// console.log(path.join(__dirname, '/uploads'));
//Connect database
db.connect();
// chuyển body trả về về kiểu json


//router init
router(app);


app.listen(config.port, ()=>{
    console.log('App is listening on url http://localhost:' + config.port);
})