const router = require('express').Router();
const Category = require('../models/categorySchema')
const upload = require('../middlewares/upload-photo')



//post - create a new product
router.post('/categories',upload.single('photo'), async (req,res)=>{
    try {
            let category = new Category();

            category.type = req.body.title;
            category.photo = req.file.location;
            
            console.log();
            
            await category.save();
            res.json({
                status:true,
                message:"Successfully saved the category in MongoDB"
            })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//get - Get all products
router.get('/categories',async (req,res)=>{
    try {
        let categories = await Category.find({});

        res.json({
            success:true,
            categories:categories
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})


//get - Get one category
router.get('/categories/:id',async (req,res)=>{
    try {
        let category = await Category.find({_id:req.params.id});

        res.json({
            success:true,
            category:category
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})

//get - Get one category
router.get('/categoryID/:id',async (req,res)=>{
    try {
        let category = await Category.find({type:req.params.id});
        console.log("Category is : "+category);
        
        res.json({
            success:true,
            category:category
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})


//Filter categories
router.get('/categoryFilter/:id',async (req,res)=>{
    // http://localhost:3000/api/categoryFilter?category=Meat
    try {
        
        // console.log("Search for  : "+JSON.stringify(req.query));
        var searchedCatgeory = req.query.category;
        console.log(searchedCatgeory);
        console.log(searchedCatgeory[0]);
        console.log(searchedCatgeory[1]);
        
        console.log("Search for  : "+JSON.stringify(req.query.category));
       
        let response = await Category.find({type:req.query.category });

        console.log(response);
        console.log(response[0].type);
        
        res.json({
            success:true,
            category:response
        })
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message

        })
    }
})


module.exports= router;
