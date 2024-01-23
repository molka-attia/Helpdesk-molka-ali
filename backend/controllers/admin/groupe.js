const mongoose = require('mongoose');
const Groupe = require('../../models/Groupe');
const users = require('../../models/User');
const tickets = require('../../models/Ticket');



exports.getrestedesgroupes=  (req, res, next) =>{
    
    
}


exports.ajoutergroupe=(req, res, next) => {
    const groupe = new Groupe({
  specialite: req.body.specialite,
});

groupe.save()
  .then(() => res.status(201).json({
    message: 'groupe created !',
    status: 201
  }))
  .catch(error => res.status(400).json({
    error
  }));
}





exports.getGroupes=  (req, res, next) =>{
    
    Groupe.aggregate([
    
        { "$lookup": {
          "from": "users",
          "localField": "_id",
          "foreignField": "groupe_id._id",
          "as": "membre_groupe"
        }},  { "$addFields": { "_id": { "$toString": "$_id" }}},
      
        { "$lookup": {
            "from": "tickets",
            "localField": "_id",
            "foreignField": "specialite",
            "as": "ticket_groupe",
         
          }},
     
      //    {$match:{"membre_groupe._id":req.params._id}},
          {$project: {
            specialite:1,
           
            membre_groupe: 1,
            ticket_groupe:1,
            numberOftickets: {$size: "$ticket_groupe"  },
            // numberOfticketscloturer: { $cond: { if: {'etat':"non cloturer" }, then: {$sum: 1 }, else: 0 } }
         }}
       
    ])
    .then(userResults => {res.json(userResults);console.log(userResults)});
}

exports.getGroupesoftech=  (req, res, next) =>{
    
    users.aggregate([
       
        { "$lookup": {
          "from": "groupes",
          "localField": "groupe_id._id",
          "foreignField": "_id",
          "as": "groupe_membre"
        }},
        { "$lookup": {
            "from": "tickets",
            "localField": "_id",
            "foreignField": "specialite",
            "as": "ticket_groupe"
          }},
          { "$addFields": { "_id": { "$toString": "$_id" }}},
          {$match:{_id:req.params.id}},
      //    {$match:{"membre_groupe._id":req.params._id}},
          {$project: {
            specialite:1,
           
            groupe_membre: 1,
            ticket_groupe:1,
            numberOftickets: {$size: "$ticket_groupe"  },
            // numberOfticketscloturer: { $cond: { if: {'etat':"non cloturer" }, then: {$sum: 1 }, else: 0 } }
         }}
       
    ])
    .then(userResults => {res.json(userResults[0]);console.log(userResults)});
}


exports.getGroupescloturer=  (req, res, next) =>{
    
    Groupe.aggregate([
       
        { "$addFields": { "_id": { "$toString": "$_id" }}},
      
        { "$lookup": {
            "from": "tickets",
            "localField": "_id",
            "foreignField": "specialite",
            "as": "ticket_groupe",
            pipeline: [
                { $match: { "etat":"cloturer" } }
             ],
          }},
       
          {$project: {
            specialite:1,
           
         
            ticket_groupe:1,
            numberOftickets: {$size: "$ticket_groupe"  },
            // numberOfticketscloturer: { $cond: { if: {'etat':"non cloturer" }, then: {$sum: 1 }, else: 0 } }
         }},
       
    
    ])
    .then(userResults => {res.json(userResults);console.log(userResults)});
}








exports.getTechnicienspecialite = (req, res, next) => {
    Groupe.findOne({'_id':req.params.id},{_id:1,'specialite':1})
    .then(events => res.json(events));
}





exports.deleteGroupe= (req, res, next) =>{
    Groupe.deleteOne({_id:req.params.id})
    .then(userResults => res.json("succes"));
    }

    exports.updateGroupe = (req, res, next) => {
        Groupe.updateOne({'_id':req.params.id},
        {'$set':{
            'specialite':req.body.specialite,
                 
        }})
        .then(post => res.json(post));
    }
    

    exports.getGroupesnumber= (req, res, next) => {
      
          Groupe.aggregate([
             { $group:{_id:null, groupes:{$sum:1}}}
              ])
              .then(stats => {
                  res.json(stats[0]);      
              });
      
         }



         exports.ticketspergroupe= (req, res, next) => {
          
              tickets.aggregate([
                 { $group:{"tickets.specialite":1, tickets:{$sum:1}}}
                  ])
                  .then(stats => {
                      res.json(stats);      
                  });
          
             
        
        
             }