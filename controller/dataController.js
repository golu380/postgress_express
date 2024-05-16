const userModel = require('../models/userModel');

const register = async(req,res) =>{
    const {username, password,email,phone_number} = req.body;
    try{
        
        const user = await userModel.registerUser(username,password,email,phone_number);
        res.status(200).json({message:'User registered successfully',user});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
}

module.exports={register};