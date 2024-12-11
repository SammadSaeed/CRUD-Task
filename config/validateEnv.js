const validateEnv=()=>{
    const required=['MONGODB_URI','JWT_SECRET'];

    for(const item of required){
        if(!process.env[item]){
            throw new Error(`Env variable ${item} is required`);
        }
    }
};

module.exports=validateEnv;