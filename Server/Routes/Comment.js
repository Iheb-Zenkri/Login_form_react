const express = require('express')
const router = express.Router()
const {Comment} = require("../models")

router.get('/:reclamId', async (req,res) =>{
    const reclamation = req.params.reclamId
    const AllComments= await Comment.findAll({
        where :{ reclamId : reclamation }
    })
    res.json(AllComments)
});

router.post('/' , async (req,res) =>{
    const com = req.body
    await Comment.create(com)
    res.json(com)
})

module.exports = router