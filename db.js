const mongoose = require('mongoose');// importing package from npm
require('dotenv').config();
// Define the MongoDB connection URL.
const mongoUrl = process.env.MONGODB_URL; // database url..

//Set up MongoDB connection.

mongoose.connect(mongoUrl);


// Get the default connection
// Mongoose maintains a default connection object representing the MongoDb connection
const db = mongoose.connection;

// Define event Listeners for database connection.
db.on('connected',()=>{
 console.log("Connected to MongoDB server");
});

db.on("error",(err)=>{
console.error("MongoDB connection errors:",err);
});

db.on("disconnected",()=>{
console.log("MongoDb disconnected");
});

//Exporting the database connection.
module.exports = db;
