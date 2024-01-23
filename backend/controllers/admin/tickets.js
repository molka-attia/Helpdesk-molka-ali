const mongoose = require('mongoose');
const tickets = require('../../models/Ticket');
const users = require('../../models/User');











exports.editticket=(req, res, next) => {
    
   
  const id=req.params.id;

  const ticket = new tickets({
      description: req.body.description,
      priorite: req.body.priorite,
      demandeur: req.params.id,
      assignetech:'',
      etat:'non cloturer',
      opened:'closed',
      Datecreaation:new Date(),
      Datecloturation:'',
    });  
 
       tickets.updateOne({"_id":id},{"$set":{"description":req.body.description,"priorite":req.body.priorite,"specialite":req.body.specialite}})
       .then(resultat=> console.log(resultat)) 
       
         .catch(error => res.status(400).json({
           error
         }));
 
 
 }





exports.affecterautomatiquement=(req, res, next) => {
  const id=req.params.id;
 
       tickets.updateOne({"_id":id},{"$set":{"assignetech":req.body.assignetech,"Dateaffectation":req.body.Datecreaation}})
       .then(resultat=> console.log(resultat)) 
       
         .catch(error => res.status(400).json({
           error
         }));
 
 
 }












exports.getTickets = (req, res, next) =>{
  tickets.aggregate([
    //{$set: {assignetech: {$toObjectId: "$assignetech"} }},

     {$set: {specialite: {$toObjectId: "$specialite"} }},
   
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe'
          }
      },
     
      {$sort:{
        priorite:- 1,Datecreaation:1}},
      {
          $match: {
            'etat': { $ne: 'cloturer'}
          }
      }
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}

exports.getTicketswithfilter= (req, res, next) =>{
  tickets.aggregate([
    { $match: { $and: [ {'specialite':req.params.id},{ 'etat': { $ne: 'cloturer'}} ] } },
      {$set: {specialite: {$toObjectId: "$specialite"} }},
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe',
         
          }
      },
      {$sort:{
        priorite:- 1,Datecreaation:1}},
      
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}

exports.getTicketswithfilteruser= (req, res, next) =>{
  tickets.aggregate([
    { $match: { $and: [ {'specialite':req.params.groupe},{ 'etat': { $ne: 'cloturer'}},{'demandeur':req.params.id} ] } },
      {$set: {specialite: {$toObjectId: "$specialite"} }},
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe',
            
          }
      },
      {$sort:{
        priorite:- 1,Datecreaation:1}},
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}


exports.ticketsfiltertech= (req, res, next) =>{
  tickets.aggregate([
    { $match: { $and: [ {'specialite':req.params.groupe},{ 'etat': { $ne: 'cloturer'}},{'assignetech':req.params.id} ] } },
      {$set: {specialite: {$toObjectId: "$specialite"} }},
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe',
            
          }
      },
      {$sort:{
        priorite:- 1,Datecreaation:1}},
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}










exports.ticketsfilterusercloturer= (req, res, next) =>{
  tickets.aggregate([
    { $match: { $and: [ {'specialite':req.params.groupe},{ 'etat': 'cloturer'},{'demandeur':req.params.id}  ] } },
      {$set: {specialite: {$toObjectId: "$specialite"} }},
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe',
         
          }
      },
      {$sort:{
        priorite:- 1,Datecreaation:1}},
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}



exports.ticketscloturerfilter= (req, res, next) =>{
  tickets.aggregate([
    { $match: { $and: [ {'specialite':req.params.id},{ 'etat': 'cloturer'} ] } },
      {$set: {specialite: {$toObjectId: "$specialite"} }},
      {
          $lookup: {
              from: 'groupes',
              localField: 'specialite',
              foreignField: '_id',
              as: 'ticket_groupe',
           
          }
      },
      {$sort:{
        priorite:- 1,Datecreaation:1}},
  
  ])
  .then(userResults => {res.json(userResults);console.log(userResults)});
}











exports.getlatestticket= (req, res, next) => {
  tickets.find({},{_id:1,Datecreaation:1}).limit(1).sort({$natural:-1})
  .then(events => res.json(events));
}












exports.getoneticket= (req, res, next) => {
  tickets.findOne({'_id':req.params.id },{'description':1,'priorite':1,'demandeur':1,'assignetech':1,'etat':1,'specialite':1,'Datecreaation':1,'_id':1})
  .then(events => res.json(events));
}

  
  
exports.getavailabletechnicien= (req, res, next) =>{
    users.aggregate([
      { $match: { 'groupe_id._id':mongoose.Types.ObjectId(req.params.id)} },
      { "$addFields": { "_id": { "$toString": "$_id" }}},
      
      { "$lookup": {
        "from": "tickets",
        "localField": "_id",
        "foreignField": "assignetech",
        "as": "user_ticket",
        pipeline: [
          { $match: { "etat":"non cloturer" } }
       ],
      }},
      {$match:{type:"technicien"}},
      {$project: {
        _id:1,
          name:1,
          email:1,
          user_img:1,
          user_ticket: 1,
          groupe_id:1,
          numberOftickets: { $size: "$user_ticket"  }
       }}
      //])
      ,
      {$sort:{
        numberOftickets:1}},
     
  
  ])
 
  .then(userResults => {res.json(userResults[0]);console.log(userResults)});
}






























   ////////////////////////////////////////////////////////////////////////////////////////////////


   exports.delete= (req, res, next) =>{
    tickets.deleteOne({_id:req.params.id})
    .then(userResults => res.json("succes"));
    }
    exports.getTechtickets = (req, res, next) => {
  
tickets.aggregate([
  //{$set: {assignetech: {$toObjectId: "$assignetech"} }},

   {$set: {specialite: {$toObjectId: "$specialite"} }},
 
    {
        $lookup: {
            from: 'groupes',
            localField: 'specialite',
            foreignField: '_id',
            as: 'ticket_groupe'
        }
    },
   
    {$sort:{
      priorite:- 1,Datecreaation:1}},
    {
        $match: {
          'assignetech':req.params.id,
          'etat': { $ne: 'cloturer'}
        }
    }

])
.then(userResults => {res.json(userResults);console.log(userResults)});
}


  exports.affecterautechnicien = (req, res, next) => {
    tickets.updateOne({'id':req.params.id},
    {'$set':{
        'assignetech':req.body.specialite,
             
    }})
    .then(post => res.json(post));
}

exports.addticket= (req, res, next) => {
 const ticket = new tickets({
    description: req.body.description,
    priorite: req.body.priorite,
    demandeur: req.params.id,
    assignetech:'',
    etat:'non cloturer',
    specialite:req.body.specialite,
    Datecreaation:new Date(),
    Dateaffectation:new Date(),
    Datecloturation:'',
  });

  ticket.save()
    .then(() => res.status(201).json({
      message: 'Ticket created !',
      status: 201




    }))
    .catch(error => res.status(400).json({
      error
    }));


    
}





exports.affecterau=(req, res, next) => {
  tickets.updateOne({'_id':req.params.id},
  {'$set':{"assignetech":req.body.assignetech,"Dateaffectation":new Date()}})
  .then(post => res.json(post));
}

 






exports.changeretatencoursdetraitement = (req, res, next) => {
  tickets.updateOne({'_id':req.params.id},
  {'$set':{
      'etat':"en cours de traitement",
           
  }})
  .then(post => res.json(post));
}


    exports.getTicketscloturer = (req, res, next) => {
      tickets.aggregate([
        //{$set: {assignetech: {$toObjectId: "$assignetech"} }},
    
         {$set: {specialite: {$toObjectId: "$specialite"} }},
       
          {
              $lookup: {
                  from: 'groupes',
                  localField: 'specialite',
                  foreignField: '_id',
                  as: 'ticket_groupe'
              }
          },
         
          {$sort:{
            priorite:- 1,Datecreaation:1}},
          {
              $match: {
                'etat':  'cloturer'
              }
          }
      
      ])
      .then(userResults => {res.json(userResults);console.log(userResults)});
    }
  
exports.getTicketsnumber = (req, res, next) => {
 
    tickets.aggregate([
        {$match:{etat:{ $ne: 'cloturer'}}},
       { $group:{_id:null, tickets:{$sum:1}}}
        ])
        .then(stats => {
            res.json(stats[0]);      
        });

   }
   exports.getTicketsnumber2 = (req, res, next) => {
  
      tickets.aggregate([
          {$match:{etat: 'cloturer'}},
         { $group:{_id:null, tickets:{$sum:1}}}
          ])
          .then(stats => {
              res.json(stats[0]);      
          });
  
     }
   exports.getTicketstechnumber= (req, res, next) => {
  
      tickets.aggregate([
       
        { $match: { $and: [ { assignetech:req.params.id}, { etat:{ $ne: 'cloturer'} } ] } },
          // {$project : {"users" : {$size :"$users"},_id:0}}
         { $group:{_id:null, tickets:{$sum:1}}}
          ])
          .then(stats => {
              res.json(stats[0]);      
          });
  
     


     }





////////////////////////////////////////////////////userTicket/////////////////////////////////////////////////



     exports.getUsertickets = (req, res, next) => {
  
tickets.aggregate([
  //{$set: {assignetech: {$toObjectId: "$assignetech"} }},

   {$set: {specialite: {$toObjectId: "$specialite"} }},
 
    {
        $lookup: {
            from: 'groupes',
            localField: 'specialite',
            foreignField: '_id',
            as: 'ticket_groupe'
        }
    },
   
    {$sort:{
      priorite:- 1,Datecreaation:1}},
    {
        $match: {
          'demandeur':req.params.id,
          'etat': { $ne: 'cloturer'}
        }
    }

])
.then(userResults => {res.json(userResults);console.log(userResults)});
}


  exports.getUserticketscloturer = (req, res, next) => {

tickets.aggregate([
  //{$set: {assignetech: {$toObjectId: "$assignetech"} }},

   {$set: {specialite: {$toObjectId: "$specialite"} }},
 
    {
        $lookup: {
            from: 'groupes',
            localField: 'specialite',
            foreignField: '_id',
            as: 'ticket_groupe'
        }
    },
   
    {$sort:{
      priorite:- 1,Datecreaation:1}},
    {
        $match: {
          'demandeur':req.params.id,
          'etat': 'cloturer'
        }
    }

])
.then(userResults => {res.json(userResults);console.log(userResults)});
}





     exports.userticketsnumber= (req, res, next) => {
    
        tickets.aggregate([
             {$match:{demandeur:req.params.id}},
            // {$project : {"users" : {$size :"$users"},_id:0}}
           { $group:{_id:null, tickets:{$sum:1}}}
            ])
            .then(stats => {
                res.json(stats[0]);      
            });
    
       
  
  
       }
        //  
        exports.userticketscloturernumber= (req, res, next) => {
        
            tickets.aggregate([
              { $match: { $and: [ { demandeur:req.params.id}, { etat:"cloturer" } ] } },
                // {$project : {"users" : {$size :"$users"},_id:0}}
               { $group:{_id:null, tickets:{$sum:1}}}
                ])
                .then(stats => {
                    res.json(stats[0]);      
                });
      
           }
           exports.userticketsnoncloturernumber= (req, res, next) => {
          
              tickets.aggregate([
                { $match: { $and: [ { demandeur:req.params.id}, { etat:{ $ne: 'cloturer'} } ] } },
                  // {$project : {"users" : {$size :"$users"},_id:0}}
                 { $group:{_id:null, tickets:{$sum:1}}}
                  ])
                  .then(stats => {
                      res.json(stats[0]);      
                  });
        
             }



             exports.allticketsnumber= (req, res, next) => {
            
                tickets.aggregate([
                   { $group:{_id:null, tickets:{$sum:1}}}
                    ])
                    .then(stats => {
                     res.json(stats[0]);console.log(new Date())});   
                    
          
               }
               

              exports.statticketsencoursdetrait= (req, res, next) => {
              
                  tickets.aggregate([
                    { $match: { $and: [ { assignetech:req.params.id}, { etat:'en cours de traitement' } ] } },
                      // {$project : {"users" : {$size :"$users"},_id:0}}
                     { $group:{_id:null, tickets:{$sum:1}}}
                      ])
                      .then(stats => {
                          res.json(stats[0]);      
                      });
            
                 }





exports.getnombretickettotalencoursdetraitement= (req, res, next) => {
  
    tickets.aggregate([
      { $match:  { etat:'en cours de traitement' } },
        // {$project : {"users" : {$size :"$users"},_id:0}}
       { $group:{_id:null, tickets:{$sum:1}}}
        ])
        .then(stats => {
            res.json(stats[0]);      
        });

   }

  exports.getnombretotalticketnonafféctés= (req, res, next) => {
  
      tickets.aggregate([
        { $match:  { assignetech:'' } },
          // {$project : {"users" : {$size :"$users"},_id:0}}
         { $group:{_id:null, tickets:{$sum:1}}}
          ])
          .then(stats => {
              res.json(stats[0]);      
          });
  
     }














             exports.getBeginningOfTheWeek = (now) => {
              const days = (now.getDay() + 7 - 1) % 7;
              now.setDate(now.getDate() - days);
              now.setHours(0, 0, 0, 0);
              return now;
          };

          exports.userticketsnoncloturernumberperweek= (req, res, next) => {
            users.aggregate([
              
              { "$addFields": { "_id": { "$toString": "$_id" }}},
              
              { "$lookup": {
                "from": "tickets",
                "localField": "_id",
                "foreignField": "assignetech",
                "as": "user_ticket",
                pipeline: [
                  { $match:{ "Datecreaation": { $gte: new Date("2022-05-02"), $lt: new Date() } } }
               ],
              }},
              {$match:{type:"technicien"}},
              {$project: {
                  name:1,
                  email:1,
                  user_img:1,
                  user_ticket: 1,
                  groupe_id:1,
                  numberOftickets: { $size: "$user_ticket"  }
               }}
            
          
          ])
          .then(userResults => {res.json(userResults);console.log(userResults)});
       }
       



       exports.userticketsnumbernoncloturerperweekedit= (req, res, next) => {
        users.aggregate([
          
          { "$addFields": { "_id": { "$toString": "$_id" }}},
          
          { "$lookup": {
            "from": "tickets",
            "localField": "_id",
            "foreignField": "assignetech",
            "as": "user_ticket",
            pipeline: [
             // { $match:{ "Datecreaation": { $gte: new Date(req.params.datedebut), $lt: new Date(req.params.datefin) } } }
            { $match:{ "Datecreaation": { $gte: new Date(req.params.datedebut), $lte: new Date(req.params.datefin) } } }
            // { $match:{ "Datecreaation": { $gte: new Date("2022-05-02"), $lt: new Date("2022-06-09") } } }
           ],
          }},
          {$match:{type:"technicien"}},
          {$project: {
              name:1,
              email:1,
              user_img:1,
              user_ticket: 1,
              groupe_id:1,
              numberOftickets: { $size: "$user_ticket"  }
           }}
      
      ])
      .then(userResults => {res.json(userResults);console.log(userResults);console.log(req.params.datefin)});
   }



exports.numberofticketstoday  = (req, res, next) => { 
 tickets.aggregate([
                  { $match:{ "Datecreaation":{$gt:new Date(Date.now() - 24*60*60 * 1000)}} },
                  
                 { $group:{_id:null, tickets:{$sum:1}}}
                  ])
                  .then(stats => {
                      res.json(stats[0]); console.log(new Date(new Date().getMonth()));     
                  });
        
             }


            exports.clotureticket=(req, res, next) => {
              const id=req.params.id;
             
             
              tickets.updateOne({"_id":id},{"$set":{"etat":'cloturer',"Datecloturation":new Date(),"note":req.body.note}})
                   .then(resultat=> console.log(resultat)) 
                   
                  
                     .catch(error => res.status(400).json({
                       error
                     }));
             
             
             };