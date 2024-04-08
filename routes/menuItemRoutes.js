const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');
//MenuItem post..

router.post('/',async(req,res)=>{
    try{
      const data = req.body;
     const newMenuItem = MenuItem(data);
     const savedMenuItemData = await newMenuItem.save();
     console.log("MenuItem saved");
     res.status(200).json(savedMenuItemData);
    }
    catch(err){
     res.status(200).json({error:err});
    }
     
  });
  
  //MenuItem get..
  
  router.get("/",async(req,res)=>{
    try{
     const data = await MenuItem.find();
     console.log("menu item fetched");
     res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:err});
    }
  });
  
  // parameterzied for taste in menuItem.
  router.get('/:tasteType',async(req,res)=>{
  try{
    const tasteData  =  req.params.tasteType; 
    if(tasteData == 'Sweet'||tasteData == 'Sour'||tasteData=='Spicy'){

    const response = await MenuItem.find({taste:tasteData});
    res.status(200).json(response);
    }
    else{
        res.status(404).json({error:"Invalid taste"})
    }
  }
  catch(e){
    res.status(500).json({error:e.message});
  }
  });



  //update menuItem 
 router.put('/:id',async(req,res)=>{
  try{
   // fetched the id from url..
   const menuItemId = req.params.id;
   //now post the updated  body 
   const updatedMenuItem = req.body;
  const response = await  MenuItem.findByIdAndUpdate(menuItemId,updatedMenuItem,{
    new :true,
    validators:true,
  });
  if(!response){
    return res.status(404).json({error:"Invalid not found id"});
  }
  console.log("MenuItem updated");
  res.status(200).json(response);


  }
  catch(e){
    res.status(500).json({error:e.message});
  
  }
 });


 router.delete('/:id',async(req,res)=>{
  try{
    // fetched id from url..
   const menuItemId = req.params.id;

  // now finding that id in MenuItem table..
  const response  = await MenuItem.findByIdAndDelete(menuItemId);
  if(!response){
    return res.status(404).json({error:"Invalid menu id"});
  }
  console.log("MenuItem deleted");
  res.status(200).json({message:"MenuItem Deleted Successfully"});
  }
  catch(e){
    console.error('Error deleting menuItem:', e);
    res.status(500).json({error:e.message});
  }
 });



  module.exports = router;