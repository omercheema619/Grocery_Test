const router = require('express').Router();
const Product = require('../models/productSchema')
const upload = require('../middlewares/upload-photo')



//post - create a new product
router.post('/products',upload.single('photo'), async (req,res)=>{
    try {
            let product = new Product();

            product.productCode = req.body.productCode;
            product.category  =  req.body.category;
            product.title = req.body.title;
            product.description = req.body.description;
            product.photo = req.file.location;
            product.unitPrice = req.body.unitPrice;
            product.referencePrice = req.body.referencePrice;
            product.stockQuantity = req.body.stockQuantity;
            product.isOnSale = req.body.isOnSale;
            product.salePrice = req.body.salePrice;

            // console.log(req.params.id);
            // console.log(req.body.productCode);
            // console.log(req.body.category);
            // console.log(req.body.title);
            // console.log(req.body.description);
            // console.log(req.body.unitPrice);
            // console.log(req.body.referencePrice);
            // console.log(req.body.stockQuantity);
            // console.log(req.body.isOnSale);
            // console.log(req.body.salePrice);
            // console.log(req.body.photo);
            // console.log(req.file.location);
            
            await product.save();
            res.json({
                status:true,
                message:"Successfully saved the product in MongoDB"
            })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//get - Get all products
router.get('/products',async (req,res)=>{
    try {
        let products = await Product.find({});

        res.json({
            success:true,
            products:products
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//get - get a single product
router.get('/products/:id',async (req,res)=>{
    try {
        let product = await Product.find({_id:req.params.id})
        .populate('category')
        .exec();

        res.json({
            success:true,
            product:product
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//put - update a single product
router.put('/products/:id',upload.single('photo') ,async (req,res)=>{
    try {
        // console.log(req.params.id);
        // console.log(req.body.productCode);
        // console.log(req.body.category);
        // console.log(req.body.title);
        // console.log(req.body.description);
        // console.log(req.body.unitPrice);
        // console.log(req.body.referencePrice);
        // console.log(req.body.stockQuantity);
        // console.log(req.body.isOnSale);
        // console.log(req.body.salePrice);
        // console.log("File location : "+req.file.location);

        let parameters={};
        if (req.params.id){
            console.log("Req Params ID : "+ req.params.id);
           
        }

        if (req.body.productCode){
            console.log("Product Code: "+ req.body.productCode);
            parameters.productCode= req.body.productCode;
        }

        if (req.body.category){
            console.log("Category :"+ req.body.category);
            parameters.category= req.body.category;
        }

        if (req.body.title){
            console.log("Title :"+ req.body.title);
            parameters.title= req.body.title;
        }

        if (req.body.description){
            console.log("Description :"+ req.body.description);
            parameters.description= req.body.description;
        }

        if (req.body.unitPrice){
            console.log("UnitPrice :"+ req.body.unitPrice);
            parameters.unitPrice= req.body.unitPrice;
        }

        if (req.body.referencePrice){
            console.log("ReferencePrice :"+ req.body.referencePrice);
            parameters.referencePrice= req.body.referencePrice;
        }

        if (req.body.stockQuantity){
            console.log("StockQuantity :"+ req.body.stockQuantity);
            parameters.stockQuantity= req.body.stockQuantity;
        }

        if (req.body.isOnSale){
            console.log("IsOnSale :"+ req.body.isOnSale);
            parameters.isOnSale= req.body.isOnSale;
        }

        if (req.body.salePrice){
            console.log("Sale Price :"+ req.body.salePrice);
            parameters.salePrice= req.body.salePrice;
        }
        if (!req.file){
            console.log("No Photo");
            
        }else{
            console.log("photo :"+ req.file.location);
            parameters.photo= req.file.location;

        }

        // console.log("Printing pramaters: "+req.file.location);
        


        console.log("In update API : 0");
     
        //     parameters={
        //         productCode  : req.body.productCode,  
        //         category     : req.body.category, 
        //         title        : req.body.title,
        //         description  : req.body.description, 
        //         unitPrice    : req.body.unitPrice ,
        //         referencePrice : req.body.referencePrice , 
        //         stockQuantity  : req.body.stockQuantity ,
        //         isOnSale     : req.body.isOnSale ,
        //         salePrice    : req.body.salePrice
        //     }
        console.log("In update API : 1");
        
        // for(let prop in parameters) if(!parameters[prop]) delete parameters[prop];
        // for (const property in parameters){
        //     console.log(`${property}: ${parameters[property]}`);
        // } 
        console.log("In update API : 2" +JSON.stringify(parameters));
         
        //  console.log("Printing parameters: "+parameters);

        let product = await Product.findOneAndUpdate(
            {_id:req.params.id},
            {
                
                 $set:parameters
                
            },
            {new:true,upsert:true}
        );

        res.json({
            status:true,
            updatedProduct:product
        })
       
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
})


//Filter product by product title
router.get('/productFilter/:id',async (req,res)=>{
    // http://localhost:3000/api/categoryFilter?category=Meat
    try {
        
        // console.log("Search for  : "+JSON.stringify(req.query));
        var searchedProduct = req.query.product;
        console.log(searchedProduct);
        console.log(searchedProduct[0]);
        console.log(searchedProduct[1]);
        
        console.log("Search for  : "+JSON.stringify(req.query.product));
       
        let response = await Product.find({_id:req.query.product });

        console.log(response);
        console.log(response[0].title);
        
        res.json({
            success:true,
            product:response
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//Filter product by category name
router.get('/productFilterbyCategory/:id',async (req,res)=>{
    // http://localhost:3000/api/categoryFilter?category=Meat
    try {
        
        // console.log("Search for  : "+JSON.stringify(req.query));
        var searchedProduct = req.query.categoryID;
        console.log(searchedProduct);
      
        
        console.log("Search for  : "+JSON.stringify(req.query.categoryID));
       
        let response = await Product.find({category:req.query.categoryID });

        console.log(response);
        console.log(response[0].title);
        
        res.json({
            success:true,
            product:response
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})


//delete - delete a single product
router.delete('/products/:id',async (req,res)=>{
    console.log("In Deleted prodyct");
    try {
        let deletedProduct = await Product.findOneAndDelete({_id:req.params.id});
        
        if(deletedProduct){
            res.json({
                status:true,
                message:"Successfully Deleted"
            })
            
        }
        
    } catch (error) {
        console.log("In Deleted prodyct error");
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

module.exports= router;