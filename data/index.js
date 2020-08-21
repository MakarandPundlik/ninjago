const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//static folder
app.use(express.static('public'));
//connectiong to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago',{useNewUrlParser:true});

//global promise overriding
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/', require('./routes/router'));

//error middleware
app.use((err,req,res,next)=>{
    //console.log(err.message);
    res.status(422).send({
        err:err.message
    })
});

// listen for requests
const port = process.env.port || 2611;
app.listen(port, ()=>{
    console.log(`connected to the port ${port} successfully`);
});
