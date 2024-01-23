import { User } from "../user/user.model";

export interface Groupe {
    _id?: string;
    specialite?:string;
    membre_groupe?:User[];
    numberOftickets?:number;
    groupe_membre?:User[];
  
  }