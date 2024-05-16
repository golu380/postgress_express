const pool = require('../config/index');
const bcrypt = require('bcrypt');


const registerUser = async(username,password,email,phone_number) =>{
    const hashedpassword = await bcrypt.hash(password,10);
    const client = await pool.connect();
    try{
        const existingUser = await client.query('SELECT * FROM users WHERE email = $1 OR username = $2',[email,username]);
        // if(existingUser.rows.length > 0){
        //     client.release()
        //     res.status(400).json({error:'User already exists'})
        // }
        const result = await client.query('INSERT INTO users (username,password,email,phone_number) values ($1,$2,$3,$4) RETURNING *',[username,hashedpassword,email,phone_number])
        return result.rows[0];
    }catch(err){
        console.log(err)
    }finally{
        client.release();
    }
}



module.exports = {registerUser};