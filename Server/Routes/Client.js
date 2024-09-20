const express = require('express')
const router = express.Router()
const {Clients , Company} = require("../models")

router.get('/All', async (req,res) =>{
    const AllClients = await Clients.findAll()
    res.json(AllClients)
});

router.get('//',async (req,res) => {
    res.json(null)
})
router.get('/:username',async (req,res) => {
    const user = req.params.username
    const cli = await Clients.findOne({
        where: {
            username : user
        }
    })
        res.json(cli)
   
});

router.post('/', async (req,res) => {
    const cli = req.body
    try{
       const check = await Clients.findOne({
            where:{
                username: cli.username
            }
        })
        const company = await Company.findOne({
            where: {
              username: cli.username,
            },
          });
        if(check || company){
            res.json("Username is already in use")
        }
        else{
            await Clients.create(cli)
            res.json(cli);
        }

    }catch(e){
        console.error(e)
        res.json("fail")
    }

})



module.exports = router