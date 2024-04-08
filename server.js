const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const MenuItem = require('./models/menu');
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to my Hotel");
});

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
