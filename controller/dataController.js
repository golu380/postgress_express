const Joi = require("joi");
const bcrypt = require("bcrypt");
const {pool} = require('../config/index');
const JwtService = require('../services/JwtService')
const sendVerificationEmail = require('./EmailHandler');

const register = async (req, res, next) => {
    const {full_name,email,username,phone_number,password} = req.body;
    const client = await pool.connect();
  const registerSchema = Joi.object({
    full_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(4).max(10),
    phone_number: Joi.required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .required(),
    // confirm_password:Joi.ref('password')
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }
let access_token
  try{
    const exists = await client.query('select * from users where email = $1 or username = $2',[email,username]);
    if(exists.rows.length > 0){
        return res.status(409).json({message:'Email or username already exists.'})
    }
    const hashedpassword = await bcrypt.hash(password,11);
    const result = await client.query('INSERT INTO users (username,password,email,phone_number,full_name) values ($1,$2,$3,$4,$5) RETURNING *',[username,hashedpassword,email,phone_number,full_name])
    access_token = JwtService.sign({ token: result.rows[0] })
    
  }catch(err){
    console.log(err);
  }
  // sendVerificationEmail(email,access_token);
  res.status(200).json({access_token});

};
const login = async (req,res,next)=>{
    const {usernameoremail,password} = req.body;
    const client = await pool.connect();
  try{
    let user ;
    if(usernameoremail.includes('@')){
      user = await client.query('select * from users where email = $1',[usernameoremail]);
    }else{
      user = await client.query('select * from users where username= $1',[usernameoremail])
    }
    if(user.rows.length <= 0){
      res.status(410).json({message:'user not exists please register first!'})
    }
    const match = await bcrypt.compare(password,user.rows[0].password)
    console.log(user.rows[0]);
    if(!match){
      res.status(411).json({message:'password does not matched!'})
    }
    const access_token = JwtService.sign({
      id: user.rows[0].id,
      full_name: user.rows[0].full_name,
      email: user.rows[0].email,
      isAdmin: user.rows[0].isAdmin,
      username:user.rows[0].username

    })

    res.cookie('usercookie', access_token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true
    })
    const loggeduser = user.rows[0]
    console.log(access_token)
    
    res.status(201).json({ loggeduser, access_token })
  
  }catch(err){
    console.log(err);
  }
 
 
    

}
module.exports = { register,login };
