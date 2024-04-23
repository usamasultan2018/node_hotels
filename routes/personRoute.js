const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware,generateToken} = require("./../jwt");


//posting person data to the data where collection name is person..
router.post('/signup',async(req,res)=>{

    try{
    
        const data = req.body;//Assuming the request body contain the person data.
      
    // Create a new person doc using the mongoose model.

    const newPerson = new Person(data);
  
   const savedPerson  =  await newPerson.save();
   console.log("Person data saved");
   const payload = {
    id:savedPerson.id,
    username:savedPerson.username,
   }
   const token = generateToken(payload);
   console.log("Token is ",token);
   res.status(200).send({response:savedPerson,token:token});
    }
    catch(err){
        console.log(err);
     res.status(500).send({error:err});
    }

});

// login user 

router.post("/login",async(req,res)=>{


    try{
        // Extracting data from  body username and password
        const {username,password} = req.body;
        // find the user 
        const user = await Person.findOne({username:username});

        // user does not exist or password is invalid return error.
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        // generate token 
        const payload = {
            id : user.id,
            username:user.username,
        }
        const token = generateToken(payload);
        res.status(200).json({token});

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});
// get all person from collection of person
router.get('/',async(req,res)=>{
try{

    const data =await Person.find();
    console.log("data fetched");
    res.status(200).send(data);
}
catch(err){
res.status(500).send({error:err});
}
});
// current user profile data 
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{

    try{
        const userData = req.user;
        console.log("UserData ",userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
})


//paramter for worker in person
router.get('/:workType',async(req,res)=>{
 
    try{
     const workType = req.params.workType;
     if(workType == 'manager'||workType=='chief'||workType == 'waiter'){
        const response = await Person.find({work:workType});
        res.status(200).json(response);
     }
     else{
        res.status(404).json({error:"Invalid work type"});
     }
    
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
    
    });


// update function..

router.put('/:id',async(req,res)=>{
try{
    const personId = req.params.id;//Extracting the id from URl parameter.
    const updatedPersonData = req.body;//Update data for the person.

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true,
    });

    if(!response){
        console.log("nsod");
        return res.status(404).json({error:"Person not found!"});
    }
    console.log("Data updated");
    res.status(200).json(response);
    

}
catch(e){
    res.status(500).json({error:e.message});
}
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found!" });
        }
        console.log("Person data deleted");
        res.status(200).json({ message: "Person Deleted Successfully" });
    } catch (e) {
        console.error('Error deleting person:', e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;    