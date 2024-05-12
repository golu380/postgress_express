
require('dotenv').config()

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

module.exports=db_info;
  