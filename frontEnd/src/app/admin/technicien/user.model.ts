import { Groupe } from "../groupe/groupe.model";
import { Ticket } from "../ticket/ticket.model";
import { Departement } from "../user/departement.model";

export interface User {
  _id?: string;
  name?:string;
  prenom?:string;
  tel?:string;
  poste:string;
  password?:string;
  user_img?:string;
  email?:string;
  type?:string;
  groupe_id?:string;
  departement_id?:string;
  user_ticket?:Ticket;
  user_departement?:Departement;
  technicien_groupe?:any;

  numberOftickets?:number;

}


