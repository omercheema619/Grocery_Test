const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../middlewares/verify-token')
const Order = require('../models/orderSchema')

router.post('/payment',verifyToken,(req,res)=>{
    let totalPrice = Math.round(req.body.totalPrice *100);
    console.log("In payment: ");
    console.log(req.body.totalPrice);
    console.log(req.decoded.email);
    
    
    stripe.customers.create({
        email: req.decoded.email
    }).then(customer =>{
        console.log("I am in api call created customer");
        return stripe.customers.createSource(customer.id,{
            source:'tok_visa'
        })
    }).then(source=>{
        console.log("In Charge");
        return stripe.charges.create({
            amount: totalPrice,
            currency:'gbp',
            customer: source.customer
        })
    }).then(async charge =>{
        let order = new Order();
        let cart = req.body.cart;
        console.log("In Order");
        console.log("I am in testing cart");
        console.log(cart);
        
        
        cart.map(product => {
            console.log(product[0]._id);
            console.log(parseInt(product[0].quantity));
            console.log(product[0].unitPrice);
            console.log(product[0].isOnSale);
            console.log(product[0].salePrice);
            
            order.products.push({
                productID: product[0]._id,
                quantity: parseInt(product[0].quantity),
                price: product[0].unitPrice,
                salePrice: product[0].salePrice,
                isOnSale: product[0].isOnSale
            });
           });
           console.log(req.body.estimatedPickup);
           console.log("Cart total is: ");
           console.log(req.body.totalPrice);
           console.log(req.decoded._id);
        
        order.owner = req.decoded._id;
        order.cartTotal = req.body.totalPrice;
        order.estimatedPickup = "test date";
        var today = new Date();
        // var str = today.toGMTString(); 
        order.orderDate = today.toGMTString();
        await order.save();
        res.json({
            success:true,
            message: "Successfully made payment"
        })
    }).catch(err=>{
        res.status(500).json({
            success:false,
            message:err.message
        })
    })
})

module.exports = router;

