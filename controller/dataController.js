const Joi = require("joi");
const bcrypt = require("bcrypt");
const {pool} = require('../config/index');
const JwtService = require('../services/JwtService')

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
        return res.status(400).json({message:'Email or username already exists.'})
    }
    const hashedpassword = await bcrypt.hash(password,11);
    const result = await client.query('INSERT INTO users (username,password,email,phone_number,full_name) values ($1,$2,$3,$4,$5) RETURNING *',[username,hashedpassword,email,phone_number,full_name])
    access_token = JwtService.sign({ token: result.rows[0] })
    
  }catch(err){
    console.log(err);
  }
  res.status(200).json({access_token});

};
// const login = async (req,res,next)=>{
//     const {username,email,password} = req.body;
//     const client = pool.

// }
module.exports = { register };
