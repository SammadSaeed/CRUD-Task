const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {

        username:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true,minlength:8},
        createdAt:{type:Date,default:Date.now}
    }
);

userSchema.pre('save',async function(next){

    if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password,8);
    }
    next();
})

userSchema.methods.comparePassword= async function(password){
    return bcrypt.compare(password,this.password);
}

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign(
        {
            userId: this._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
}

module.exports=mongoose.model('User',userSchema);
