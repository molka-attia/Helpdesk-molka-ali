const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: false},
    prenom: {type: String, required: false},
    tel: {type: String, required: false},
    poste: {type: String, required: false},
    email: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    type:{type: String, required: false},
    user_img:{type: String, required: false},
    departement_id:{type: String, required: false},
    groupe_id:{type: Array, required: false},
});

module.exports = mongoose.model('User', userSchema);
