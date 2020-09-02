const express = require("express");
const Order = require("../model/order");
const Cart = require("../model/cart");
const router = express.Router();
const passport = require("passport");
const validator = require('validator');

router.get("/", async (req, res) => {
  try {
    let orders = await Order.find().sort({ name: "asc" });
    res.send(orders);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("/",passport.authenticate("jwt", { session: false }),
    async(req,res)=>{
    try{             
        let body = req.body;
        const user = req.user;
        if (!body.telephone){
            return res.status(422).json({ message: "telephone is required" });
        }
        if(!validator.isInt(body.telephone)){
            return res.status(422).json({ message: "invalid telephone" });
        }
        if (!body.total){
            return res.status(422).json({ message: "total is required" });
        }
        if(!validator.isDecimal(body.total)){
            return res.status(422).json({ message: "invalid total" });
        }
        if (!body.fullname){
            return res.status(422).json({ message: "Fullname is required" });
        }
        if (!body.address){
            return res.status(422).json({ message: "address is required" });
        }
        if(!body.address.zip){
            return res.status(422).json({ message: "zip code is required" });
        }
        if(!body.paymentMethod){
            return res.status(422).json({ message: "Payment Method is required" });
        }

        const cart = await Cart.find({ userId: req.user.id });

        let order = new Order({
            userId: user.id,
            telephone: body.telephone,
            total: body.total,
            currency: body.currency,
            fullname: body.fullname,
            address: body.address,
            paymentMethod: body.paymentMethod,
            items: cart,
        });
        
        let response = await Order.create(order);

        res.status(201).json({response: response , message: "Order created"});

    }catch(e){
        return res.status(500).send(e.message);
    }
});

module.exports = router;