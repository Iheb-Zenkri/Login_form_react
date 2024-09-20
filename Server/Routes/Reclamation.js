const express = require('express')
const router = express.Router()
const {Reclamation , Clients} = require("../models")

router.get('/Clients/:clientId', async (req,res) => {
    const user = req.params.clientId
    const rec = await Reclamation.findAll({
        where: { clientId : user }
    })
        res.json(rec)
});

router.get('/Company/:companyId', async (req,res) => {
    const user = req.params.companyId
    const cli = await Reclamation.findAll({
        where: { companyId : user }
    })
    res.json(cli)
});


router.post('/', async (req,res) => {
    const reclam = req.body
    await Reclamation.create(reclam)
    res.json(reclam)
});


module.exports = router