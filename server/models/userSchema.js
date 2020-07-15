const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    name:String,
    email:{type:String, unique:true, required:true},
    password: {type:String,required:true},
    address:{type:Schema.Types.ObjectId, ref: 'Address'}
})

UserSchema.pre('save',function(next){
    let user = this;
    if (this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next();
            }

            bcrypt.hash(user.password,salt,null,(err,hash)=>{
                if(err){
                    return next(err)
                }

                user.password = hash;
                next();
            })
        })
    }else{
        return next();
    }

})

UserSchema.methods.comparePassword = function(password,next){
    let user = this;
    //compare the password user typed against the one in DB
    return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User', UserSchema)