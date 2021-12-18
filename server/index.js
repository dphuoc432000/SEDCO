const express = require('express');
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const db = require('./config/db/index.js');
const router = require('./router/index.js');
const socket_router = require('./router/socket.api.js');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin: `http://localhost:3000`,
        optionsSuccessStatus: 200,
        credentials: true
    }
});
app.use(cors({
    origin: `http://localhost:3000`,
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
// console.log(path.join(__dirname, '/uploads'));

socket_router(app,io); 
app.set('socketio', io);
//Connect database
db.connect();
// chuyển body trả về về kiểu json


//router init
router(app);
app.get('/2', (req, res) =>{
    res.send("Welcome to SEDCO")
})

server.listen(process.env.PORT || config.port, ()=>{
    console.log('App is listening on url http://localhost:' + config.port);
})