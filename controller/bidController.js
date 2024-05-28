const {pool} = require('../config/index');

const bid_rgistry = async(req,res) =>{
    const client = await pool.connect();
    const project_id = req.params.project_id;
    console.log(project_id)
    
    const {amount,description} = req.body;
    console.log(req.body)
    const user_id = req.user.id;
    console.log(project_id,amount,description,user_id)

    try{
        const result = await client.query('insert into bids (project_id,amount,description,user_id) values ($1,$2,$3,$4)',[project_id,amount,description,user_id]);
        res.status(201).json({message:'Bid added successfully',data:result.rows[0]})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server internal error'})
    }


}

module.exports ={bid_rgistry};
