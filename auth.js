const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');
passport.use(new LocalStrategy(async(Username,password,done)=>{
    //auth logic here
    try{
        console.log("Recevied Credential",Username,password);
        const user = await Person.findOne({username:Username});
      if(!user){
        done(null,false,{message:"Incorrect username"});
      }
      const isPasswordMatched =  await user.comparePassword(password);
      if(isPasswordMatched){
        done(null,user);
      }
      else{
        done(null,false,{message:"Incorrect password"});
      }
    
    }
    catch(err){
    return done(err);
    }
    
    }));

    module.exports = passport;