const jwt=require('jsonwebtoken');
const User=require('../models/users');

const authMiddleware=async (req, res, next) =>{
    try{
        const token=req.header('Authorization')?.replace('Bearer ','');
        if(!token){
            return res.status(401).json({error:"Token not given."});
        }
        console.log('Token received:', token);

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        console.log('Decoded token:', decoded);

        const user=await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({error:"User not found"});
        }
req.user=user;
next();
    }catch(err){
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports=authMiddleware;