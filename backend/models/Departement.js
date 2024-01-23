const mongoose = require('mongoose');

const departementSchema = mongoose.Schema({
    name: {type: String, required: false},
});

module.exports = mongoose.model('Departement', departementSchema);