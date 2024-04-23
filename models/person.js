const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    username:{
        required:true,
        type:String,   
    },
    password:{
        required:true,
        type:String,
    },
});
personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
try{
    //hashed password generation...
    const salt = await bcrypt.genSalt(10);
    // hashed password
    const hashedPassword = await bcrypt.hash(person.password,salt);
    person.password = hashedPassword;

    next();
    

}
catch(err){
return next(err);
}
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
// Create a Person Model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
