const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    description: {type: String, required: false},
    priorite: {type: String, required: false},
    demandeur: {type: String, required: false},
    assignetech:{type: String, required: false},
    etat:{type: String, required: false},
    specialite:{type: String, required: false},
    Datecreaation:{type: Date, required: false},
    Datecloturation:{type: Date, required: false},
    Dateaffectation:{type: Date, required: false},
    note:{type:String, required: false},
});

module.exports = mongoose.model('Ticket', ticketSchema);
