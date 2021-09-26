const express = require('express');
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const db = require('./config/db/index.js');
const router = require('./router/index.js');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
//Connect database
db.connect();
// chuyển body trả về về kiểu json
app.use(bodyParser.json());

//router init
router(app);


app.listen(config.port, ()=>{
    console.log('App is listening on url http://localhost:' + config.port);
})