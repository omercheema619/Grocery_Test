const router = require('express').Router();
const Order = require('../models/orderSchema')
const verifyToken = require('../middlewares/verify-token')

router.get('/orders',verifyToken, async (req,res)=>{
    try {
        let products = await Order.find({ owner: req.decoded._id})
        .populate('owner products.productID')
        .exec();
        console.log("I am in in Order");
        
        res.json({
            success: true,
            products:products
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})

module.exports = router;