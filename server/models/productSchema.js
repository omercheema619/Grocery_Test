const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    
        category: { type: Schema.Types.ObjectId, ref: 'Category'},
        productCode:String,
        // category: {type: Schema.Types.ObjectId, ref:'Category'},
        subCategory:String,
        title:String,
        description:String,
        photo:String,
        unitPrice:Number,
        referencePrice:Number,
        stockQuantity:Number,
        isOnSale:Boolean,
        salePrice:Number
    
    }
    // ,   
    // { typeKey: '$type' }
)


module.exports = mongoose.model('Product', ProductSchema)