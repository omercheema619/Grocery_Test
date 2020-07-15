const router = require('express').Router();
const User = require('../models/userSchema')

const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify-token')

//signup router
//before saving the user object please run this methods
router.post('/auth/signup',async (req,res)=>{
    if(!req.body.email || !req.body.email ){
        res.json({
            success:false,
            message:"Please enter email or password"
        })
    }else{
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            console.log(newUser.name);
            console.log(newUser.email);
            console.log(newUser.password);
            
            await newUser.save();
            
            let token = jwt.sign(newUser.toJSON(),process.env.SECRET,{
                expiresIn:604800 //1 week
            })

            console.log("printing token: ");
            console.log(token);
            
            res.json({
                success:true,
                token:token,
                message:" Successfully created a new user"
            })
            console.log("After res.JSON ");
            // console.log(token);

        } catch (error) {
                res.status(500).json({
                    status:false,
                    message: error.message
                })
        }
    }
})


router.get('/auth/user', verifyToken, async (req,res)=>{
    try {
        let foundUser = await User.findOne({_id:req.decoded._id})
        if(foundUser){
            res.json({
                success:true,
                user:foundUser
            })
        }
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        })
    }
})


//login route

router.post('/auth/login',async (req,res)=>{
    try {
        let foundUser = await User.findOne({email:req.body.email});
        if(!foundUser){
            res.status(403).json({
                success:false,
                message:"Authentication failed, user not found"
            })
        }else{
            if(foundUser.comparePassword(req.body.password)){
                let token = jwt.sign(foundUser.toJSON(),process.env.SECRET,{
                    expiresIn: 608400
                })
                
                res.json({
                    success:true,
                    token:token
                })
            }else{
                res.status(403).json({
                    success:false,
                    message:"Authentication failed, Wrong Password"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})


//update user profile
router.put('/auth/user',verifyToken,  async(req,res)=>{
    try {
        let foundUser = await User.findOne({_id: req.decoded._id})

        if(foundUser){
            if(req.body.name) foundUser.name = req.body.name
            if(req.body.email) foundUser.email = req.body.email
            if(req.body.password) foundUser.password = req.body.password

            await foundUser.save();

            res.json({
                success:true,
                message:"Successfully Update the user details"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
});

module.exports= router;