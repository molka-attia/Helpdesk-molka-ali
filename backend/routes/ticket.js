const express = require('express');
const router = express.Router();
const User=require('./../models/User');
const Ticket=require('./../models/Ticket');
const bcrypt = require('bcrypt');
const userController = require('../controllers/admin/users');
const ticketController = require('../controllers/admin/tickets');
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


router.get('/:id/getTechtickets',auth,ticketController.getTechtickets);
router.get('/:id/getUsertickets',ticketController.getUsertickets);
router.get('/:id/getUserticketscloturer',auth,ticketController.getUserticketscloturer);

router.get('/ticketscloturer',ticketController.getTicketscloturer);
 





router.get('/:id/getavailabletechicien',ticketController.getavailabletechnicien);



router.get('/getlatestticket',ticketController.getlatestticket);



router.delete('/:id/deleteticket',auth,ticketController.delete)

router.post('/:id/addticket',ticketController.addticket)
    

    router.put('/:id/affecterautechnicienautomatiqument',auth,ticketController.affecterautomatiquement);


router.put('/:id/changeretatencoursdetraitement',ticketController.changeretatencoursdetraitement);



    router.put('/:id/affecterautechnicien',ticketController.affecterau);
      
     router.put('/:id/clotureticket',auth,ticketController.clotureticket);
      
    


    router.put('/:id/editticket',auth,ticketController.editticket);
        
      
       
       router.get('/:id/getoneticket', ticketController.getoneticket);



router.get('/statsalltickets', auth,ticketController.getTicketsnumber);
router.get('/statsalltickets2', auth,ticketController.getTicketsnumber2);
router.get('/:id/statticketsencoursdetrait', ticketController.statticketsencoursdetrait);
router.get('/:id/statstechtickets', ticketController.getTicketstechnumber);
router.get('/:id/userticketsnumber',auth, ticketController.userticketsnumber);
router.get('/:id/userticketsnumbercloturer',auth, ticketController.userticketscloturernumber);
router.get('/:id/userticketsnumbernoncloturer',auth, ticketController.userticketsnoncloturernumber);
//userticketsnoncloturernumberperweek
router.get('/userticketsnumbernoncloturerperweek', ticketController.userticketsnoncloturernumberperweek);
//userticketsnumbernoncloturerperweekedit
router.get('/:datedebut/:datefin/userticketsnumbernoncloturerperweekedit', ticketController.userticketsnumbernoncloturerperweekedit);
//getBeginningOfTheWeek
router.get('/allticketsnumber', ticketController.allticketsnumber);
router.get('/nombretotalticketencoursdetraitement',ticketController.getnombretickettotalencoursdetraitement);
router.get('/nombretotalticketnonaffectes',ticketController.getnombretotalticketnonafféctés);

router.get('/numberofticketstoday', ticketController.numberofticketstoday);

module.exports = router;