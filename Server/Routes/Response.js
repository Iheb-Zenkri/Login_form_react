const express = require('express')
const router = express.Router()
const {Response} = require("../models")

router.get('/:reclamId', async (req,res) =>{
    const reclamation = req.params.reclamId
    const AllSuggestion= await Response.findAll({
        where :{ reclamId : reclamation }
    })
    res.json(AllSuggestion)
});

router.post('/' , async (req,res) =>{
    const com = req.body
    await Response.create(com)
    res.json(com)
})

module.exports = router