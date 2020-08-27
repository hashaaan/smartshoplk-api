const express = require("express");
const Smartphone = require("../model/smartphone");
const router = express.Router();




router.get("/",async(req,res)=>{


    await Smartphone.find({},(err,data)=>{

        res.json(data);
    })
    
});

router.get("/:id",async(req,res)=>{
await Smartphone.findById(req.params.id,(err,data)=>{
    res.json(data);
})


    
});

router.post("/", async(req,res)=>{
let phone = Smartphone({
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
await phone.save(()=>{
    res.json(phone)
})



// User.create(req.body,(error, data) => {
//     if (error) {
//       return error
//     } else {
//       console.log(data)
//       res.json(data)
//     }
//   })



    
});

router.delete("/:id", async(req,res)=>{
    await Smartphone.findByIdAndDelete({_id:req.params.id})

    
});


router.put("/:id", async(req,res)=>{
  let phone= await Smartphone.findOneAndUpdate({
        _id: req.params.id
    },
    {$set:{firstName:req.body.firstName,lastName:req.body.lastName,position:req.body.position},
    new: true, useFindAndModify: false}
    )
    res.send(phone)
}



);





module.exports=router;

