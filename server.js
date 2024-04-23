const express = require("express");
const app = express();
const db = require("./db");

require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('./auth');


const PORT = process.env.PORT || 3000;
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');


app.use(bodyParser.json());//req.body

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();// move to the next phase
}

// Middleware
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});


// Routes
app.get("/",(req, res) => {
    res.send("Welcome to my Hotel");
});

app.use('/person', personRoutes);
app.use('/menu',localAuthMiddleware, menuItemRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
