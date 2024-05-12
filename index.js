const express = require('express');
const app = express();
const {Pool} = require('pg')
const db_info = require('./config/index');
console.log(db_info);

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'Amit@100',
//     port: 5432, // default PostgreSQL port
//   });

const pool = new Pool(db_info)
  
pool.connect().then(()=>{
    console.log("connected to the database");
}).catch(err=>{
    console.log(`Error connecting to the database ${err}`)
})
app.use('/api',require('./routes/api'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});