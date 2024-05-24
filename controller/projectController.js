const {pool} = require('../config/index')
const now = new Date();
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };

const projectRegister = async (req,res,next) =>{
    console.log(req.body)
    const {title,description,status,budget} = req.body;
    // const dateTimeString = now.toLocaleString('en-US', options);
    // console.log(dateTimeString)
    const now = new Date();
    const isoDateTime = now.toISOString(); 
    console.log(isoDateTime)
    const client_id = req.user.id;
    const client = await pool.connect();
    try{
        const result = await client.query('INSERT INTO projects (title,description,client_id,status, budget) values ($1,$2,$3,$4,$5) RETURNING * ',[title,description,client_id,status,budget])
        res.status(200).json({message:'Project created successfully',data:result.rows[0]})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server internal error'})
    }
}
const getAllProject = async(req,res,next) =>{
    const client = await pool.connect();

    try{
        const result = await client.query('select * from projects');
        res.status(200).json({message:'Project fetched successfully',data:result.rows})
    }catch(err){
        res.status(500).json({message:'server internal error'})
    }
}

module.exports = {projectRegister,getAllProject}