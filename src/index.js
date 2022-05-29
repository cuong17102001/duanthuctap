import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import session from "express-session";



import cors from 'cors';

require("dotenv").config();

let app = express();
app.use(cors({credentials: true, origin: process.env.REACT_URL}));

var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  
  app.use(session(sess))

//config app


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

viewEngine(app);
initWebRoutes(app);

connectDB();



let port = process.env.PORT || 6969;


app.listen(port , () => {
    console.log("backend Nodejs is runing on the port:" + port);
});