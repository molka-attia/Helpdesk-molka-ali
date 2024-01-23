const mongoose = require('mongoose');
const departement = require('../../models/Departement');



exports.getDepartements = (req, res, next) =>{
    departement.find({},{_id:1,name:1})
    .then(userResults => {res.json(userResults);console.log(userResults)});
}
exports.ajouterdepartement=(req, res, next) => {
    const departement2 = new departement({
  name: req.body.name,
});

departement2.save()
  .then(() => res.status(201).json({
    message: 'departement created !',
    status: 201
  }))
  .catch(error => res.status(400).json({
    error
  }));
}