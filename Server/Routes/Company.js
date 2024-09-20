const express = require('express')
const {Company , Clients} = require("../models")

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFolder = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

router.get('/', async (req,res) =>{
    res.json(null)
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await Company.findOne({
            where: {
                username: username
            }
        });
        if (user) {
            if (user.logo) {
                user.logoFilename = user.logo;
            }

            if (user.details) {
                user.detailsFilename = user.details;
            }
            res.json(user);
        } else {
            res.json(null);
        }
    } catch (error) {
        res.json(null);
        }
});

router.get('/:username/logo', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await Company.findOne({
            where: {
                username: username
            }
        });
        if (!user || !user.logo) {
            res.status(404).json({ error: "Logo not found" });
            return;
        }

        const logoPath = path.join(__dirname, 'uploads', user.logo);

        if (fs.existsSync(logoPath)) {
            res.sendFile(logoPath);
        } else {
            res.status(404).json({ error: "Logo not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get('/:username/details', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await Company.findOne({
            where: {
                username: username
            }
        });
        if (!user || !user.details) {
            res.status(404).json({ error: "Details not found" });
            return;
        }

        const detailsPath = path.join(__dirname, 'uploads', user.details);

        if (fs.existsSync(detailsPath)) {
            res.sendFile(detailsPath);
        } else {
            res.status(404).json({ error: "Details not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.post('/', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'details', maxCount: 1 }]), async (req, res) => {
    try {
      let logoFilename = null;
      let detailsFilename = null;
  
      if (req.files) {
        if (req.files['logo']) {
          const logoImage = req.files['logo'][0].buffer;
          logoFilename = `${Date.now()}_${Math.floor(Math.random() * 1000)}_logo.jpg`;
          const logoImagePath = path.join(uploadFolder, logoFilename);
          fs.writeFileSync(logoImagePath, logoImage);
        }
          if (req.files['details']) {
          const detailsFile = req.files['details'][0].buffer;
          detailsFilename = `${Date.now()}_${Math.floor(Math.random() * 1000)}_details.jpg`;
          const detailsFilePath = path.join(uploadFolder, detailsFilename);
          fs.writeFileSync(detailsFilePath, detailsFile);
        }
      }

      const { logo, details, ...cli } = req.body;

      const client = await Clients.findOne({
        where: {
            username: cli.username
        }
    });
      const check = await Company.findOne({
        where: {
          username: cli.username,
        },
      });
  
      if (check || client) {
        res.json("Username is already in use");
      } else {
        const newCompany = await Company.create({
          ...cli,
          logo: logoFilename,
          details: detailsFilename,
        });
  
        res.json(newCompany);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error", details: e.message });
    }
  });


module.exports = router