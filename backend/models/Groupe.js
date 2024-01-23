const mongoose = require('mongoose');

const groupeSchema = mongoose.Schema({
    specialite: {type: String, required: false},
   
});

module.exports = mongoose.model('Groupe', groupeSchema);