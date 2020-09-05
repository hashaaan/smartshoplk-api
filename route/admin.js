const express = require("express");
const Smartphone = require("../model/smartphone");
const { findByIdAndRemove } = require("../model/smartphone");

const router = express.Router();




router.get("/mobile/",async(req,res)=>{


    await Smartphone.find({},(err,data)=>{

        res.json(data);
    })
    
});

router.get("/mobile/:mobileId",async(req,res)=>{
    let mobile = await Smartphone.findById(req.params.mobileId);

    if (!mobile) {
      return res
        .sendStatus(404)
        .send("The given Id does not exist on our server");
    }
  
    res.send(mobile);
  });




router.post("/mobile/", async(req,res)=>{

try{
    let phone =await  Smartphone({
        name :req.body.name,
        brand: req.body.brand,
        modelNo: req.body.modelNo,
        storage: req.body.storage,
        color : req.body.color,
        features: req.body.features,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        currency: req.body.currency,
        imgUrl: req.body.imgUrl
    
    
    })
     phone.save(()=>{
        res.json(phone)
        console.log("Phone added")
    })
}catch(e){
    return res.status(500).send(e.message)
}



   
});

router.delete("/mobile/:mobileId",async (req,res)=>{
   
    try {
        let mbl = await Smartphone.findOneAndDelete({ _id: req.params.mobileId });

        if (!mbl) {
            return res.status(404).send("The given Id does not exist on our server");
        }
console.log("deleted")
       res.send("Mobile deleted");

    } catch(e) {
        console.log("error",e)
    }

   
    
    
});


router.put("/mobile/:id", async(req,res)=>{
  let phone= await Smartphone.findOneAndUpdate({
        _id: req.params.id
    },
    {$set:{
        name :req.body.name,
        brand: req.body.brand,
        modelNo: req.body.modelNo,
        storage: req.body.storage,
        color : req.body.color,
        features: req.body.features,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        currency: req.body.currency,
        imgUrl: req.body.imgUrl
    },
    new: true, useFindAndModify: false}
    )
    res.send(phone)
}



);

module.exports=router;

