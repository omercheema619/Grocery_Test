const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
        estimatedPickup:String,
        orderDate:{type: Date, default: Date.now},
        products:[{
            productID:{ type:Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price:Number,
            isOnSale:Boolean,
            salePrice:Number
        }],
        owner: {type:Schema.Types.ObjectId, ref: 'User'},
        cartTotal: Number
    
    }
)


module.exports = mongoose.model('Order', OrderSchema)