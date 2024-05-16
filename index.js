const express = require('express');
const app = express();
const {Pool} = require('pg')
const db_info = require('./config/index');
const pool = require('./config/index');
// const errorHandler = require('./middleware/errorHandler');
// console.log(db_info);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(errorHandler);

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'Amit@100',
//     port: 5432, // default PostgreSQL port
//   });


  
pool.connect().then(()=>{
    console.log("connected to the database");
}).catch(err=>{
    console.log(`Error connecting to the database ${err}`)
})
app.use('/api',require('./routes/api'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});