const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/database');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

app.use(express.json());

app.use('/', require('./routes'))
app.listen(port, function(err){
    if(err){
        console.log("error in connecting to port", err)
    }
    console.log("server successfull listen the port", port)
})