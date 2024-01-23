const express = require('express');
const router = express.Router();
const User=require('./../models/User');
const Ticket=require('./../models/Ticket');

const Departement=require('./../models/Departement');
const bcrypt = require('bcrypt');
const userController = require('../controllers/admin/users');
const ticketController = require('../controllers/admin/tickets');
const departementController = require('../controllers/admin/departement');
const auth=require('../middlewares/auth');

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

router.post('/ajouterdepartement',departementController.ajouterdepartement);

router.get('/getdepartement', departementController.getDepartements);

module.exports = router;