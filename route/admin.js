const express = require("express");
const Smartphone = require("../model/smartphone");

const router = express.Router();




router.get("/",async(req,res)=>{


    await Smartphone.find({},(err,data)=>{

        res.json(data);
    })
    
});

router.get("/:id",async(req,res)=>{
// await Smartphone.findById(req.params.id,(err,data)=>{
//     res.json(data);

    let phone = await Smartphone.findById(req.params.id);

    if (!phone) {
      return res
        .sendStatus(404)
        .send("The given Id does not exist on our server");
    }
  
    res.json(phone)
})


router.post("/", async(req,res)=>{

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
        imgURL: req.body.imgURL
    
    
    })
     phone.save(()=>{
        res.json(phone)
    })
}catch(e){
    return res.status(500).send(e.message)
}


console.log("Phone added")
   
});

router.delete("/:id", async(req,res)=>{
    let phone= await Smartphone.findByIdAndDelete({_id:req.params.id})
    res.send(phone)
    console.log("deleted")

    if (!phone) {
        return res.status(404).send("The given Id does not exist on our server");
      }

    
});


router.put("/:id", async(req,res)=>{
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
        imgURL: req.body.imgURL
    },
    new: true, useFindAndModify: false}
    )
    res.send(phone)
}



);

module.exports=router;

