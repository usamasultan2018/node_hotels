const mongoose = require("mongoose");

// Define the person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    work: {
        type: String,
        enum: ["chief", "waiter", "manager"], // Work must be one of these values
        required: true, // Work is required
    },
    mobile: {
        type: String,
        required: true, // Mobile number is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique
    },
    address: {
        type: String, // Address is optional
    },
    salary: {
        type: String,
        required: true, // Salary is required
    },
});

// Create a Person Model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
