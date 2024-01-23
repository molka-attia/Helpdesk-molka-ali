export interface Ticket {
  _id?: string;
  description?:string;
  priorite?:string;
  demandeur?:string;
  assignetech?:string;
  etat?:string;
  opened?:string;
  Datecreaation?:Date;
  Datecloturation?:Date;
  note?:string;
}

//  Dateopening:{type: Date, required: false},
//Datecloturation:{type: Date, required: false},