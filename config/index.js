
require('dotenv').config()
const {Pool} = require('pg')

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: 'localhost',
//     database: 'postgres',
//     password: 'Amit@100',
//     port: 5432, // default PostgreSQL port
//   });

const db_info = {
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port : process.env.DB_PORT
    
}
const JWT_SECRET = process.env.JWT_SECRET
const EMAIL = process.env.EMAIL;
const EMAIL_PASS= process.env.EMAIL_PASS
const pool = new Pool(db_info)


module.exports={pool,JWT_SECRET,EMAIL,EMAIL_PASS};
  