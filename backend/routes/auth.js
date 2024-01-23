const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const authController = require('../controllers/auth');
const auth=require('../middlewares/auth');

const bcrypt = require('bcrypt');
const User=require('../models/User');
const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageEvents = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/images');
       
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});



router.post('/login',authController.login);

router.post('/signup', multer({storage:storageEvents}).single("user_img") ,(req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        type:"utilisateur",
        user_img:req.file.filename,
      });
    
      user.save()
        .then((ff) => {res.status(201).json({
          message: 'User created !',
          status: 201,
          userId:ff._id
        });
        
      })
        .catch(error => res.status(400).json({
          error
        }));
    })
  



});


module.exports = router;