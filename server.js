const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const MenuItem = require('./models/menu');
//Get method used to fetch the data from web.
app.get("/",function(req,res){
res.send("Welcome to my Hotel");
});

//Importing the router file
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');


//Using the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);


app.listen(PORT,()=>{
    console.log("Server is running");
});