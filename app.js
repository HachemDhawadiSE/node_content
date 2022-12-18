const express= require("express");
const app=express();
const mongoose= require('mongoose');
const cors = require('cors');
require("dotenv/config");
const bodyParser = require('body-parser');

app.use(express.json());

//Middle ware
app.use(bodyParser.json());
app.use(cors());

//import routes
const postRoute = require("./routes/postes");
const res = require("express/lib/response");
app.use('/postes',postRoute);

//routes
app.get('/',(req,res)=>{
    res.send("I m inside home");
});


//connect mongodb
mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("connected");
});

//create lisning port 
app.listen(5000);