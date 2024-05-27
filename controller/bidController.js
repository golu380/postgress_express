const {pool} = require('../config/index');

const bid_rgistry = async(req,res) =>{
    const client = await pool.connect();
    const {project_id} = req.params.project_id;
    
    const {id,amount,exp_completion_time} = req.body;
    const user_id = req.user.id;

    try{
        const result = await client.query('insert into bids (project_id,amount,exp_completion_time,user_id) values ($1,$2,$3,$4)',[project_id,amount,exp_completion_time,user_id]);
        res.status(201).json({message:'Bid added successfully',data:result.rows[0]})
    }catch(err){
        res.status(500).json({message:'server internal error'})
    }


}

module.exports ={bid_rgistry};
