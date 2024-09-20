const express = require('express')
const router = express.Router()
const {Suggestion} = require("../models")

router.get('/:reclamId', async (req,res) =>{
    const reclamation = req.params.reclamId
    const AllSuggestion= await Suggestion.findAll({
        where :{ reclamId : reclamation }
    })
    res.json(AllSuggestion)
});

router.post('/' , async (req,res) =>{
    const com = req.body
    await Suggestion.create(com)
    res.json(com)
})

module.exports = router