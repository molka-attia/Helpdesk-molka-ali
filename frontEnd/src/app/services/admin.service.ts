import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ticket } from '../admin/ticket/ticket.model';
import { User } from '../admin/user/user.model';
import { Groupe } from '../admin/groupe/groupe.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
 



  private head ;
  getHeaders(){
    const token = localStorage.getItem('id_token');
  const id = JSON.parse(localStorage.getItem('user')).userId;
 // const id='62321fd9efbf38336719f83a'
   return {
      headers: {
        'Authorization': 'Bearer ' + token,
        'userId': id
      }
    };
  }
  // private userUpdated = new Subject<User[]>();
  constructor(private http:HttpClient) { }
  API_URL: string = 'http://localhost:3000/api/users';

  private userUpdated = new Subject<User[]>();

  getUsers(){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users`,{headers:this.head});
  }
  getTechniciens() {
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/gettechniciens`,{headers:this.head});
  }

  getadmin(){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/getadmin`,{headers:this.head});
  }

  getTicketscloturer() {
    //ticketscloturer 
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/tickets/ticketscloturer`,{headers:this.head});
    }
   
////////////////////////////////////////////getdepartement//////////////////////////////////////


getDepartements() {
  //ticketscloturer 
  this.head = this.getHeaders().headers;
  return this.http.get<any>(`http://localhost:3000/api/departement/getdepartement`,{headers:this.head});
  }




/////////////////////////////////////////////////////////////////////

  getTickets(){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/tickets`,{headers:this.head});
  }


  getTicketsfiltrer(id:String){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/${id}/ticketsfilter`,{headers:this.head});
  }

  getTicketsfiltreruser(groupe:string,id:String){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/${groupe}/${id}/ticketsfilteruser`,{headers:this.head});
  }

  getTicketsfiltrertech(groupe:string,id:String){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/${groupe}/${id}/ticketsfiltertech`,{headers:this.head});
  }




  getTicketscloturerfiltreruser(groupe:string,id:String){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/${groupe}/${id}/ticketsfilterusercloturer`,{headers:this.head});
  }

  getTicketscloturerfiltrer(id:String){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/users/${id}/ticketscloturerfilter`,{headers:this.head});
  }
  





  addUser(user:User){
    this.head = this.getHeaders().headers;
     /** prenom: {type: String, required: false},
    tel: {type: String, required: false},
    poste: {type: String, required: false}, */ 
    const userData = new FormData();
    userData.append('name',user.name);
    userData.append('prenom',user.prenom);
   
    userData.append('email',user.email);
    userData.append('tel',user.tel);
    userData.append('poste',user.poste);
    userData.append('password',user.password);
    userData.append('type',user.type);
    userData.append('departement_id',user.departement_id);
    userData.append('user_img',user.user_img);

  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
     this.http.post(`http://localhost:3000/api/users/addUser`,userData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    });
  }
  
//  ajoutertechnicien(user:User){
//     const userData = new FormData();
//     userData.append('name',user.name);
//     userData.append('email',user.email);
//     userData.append('password',user.password);
//     userData.append('type',"technicien");
//     userData.append('user_img',user.user_img);
//     userData.append('groupe_id',user.groupe_id);
//     const ticketData = {email:user.email,name:user.name,password:user.password}
//   //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

//     //console.log(userData);
//      this.http.post(`http://localhost:3000/api/users/ajouterTechnicien`,userData,{headers:this.head})
//      .subscribe(res=>{
//        console.log(res);


//     });
//     this.http.post(`http://localhost:3000/api/sendmail`,ticketData,{headers:this.head})
//     .subscribe(res=>{
//       console.log(res);


//    });
//   }
  
ajoutertechnicien(user:User){
  this.head = this.getHeaders().headers;
  const userData = new FormData();
  userData.append('name',user.name);
  userData.append('prenom',user.prenom);
 
  userData.append('email',user.email);
  userData.append('tel',user.tel);
  userData.append('poste',user.poste);
  userData.append('password',user.password);
  userData.append('type','technicien');
  userData.append('departement_id',user.departement_id);
  userData.append('user_img',user.user_img);

  userData.append('groupe_id',user.groupe_id);
 
 
  const ticketData = {email:user.email}
//  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

  //console.log(userData);
   this.http.post(`http://localhost:3000/api/users/ajouterTechnicien`,userData,{headers:this.head})
   .subscribe(res=>{
     console.log(res);


  });
//   this.http.post(`http://localhost:3000/api/sendmail`,ticketData,{headers:this.head})
//   .subscribe(res=>{
//     console.log(res);


//  });
}

envoyermailech(user:User){
  const ticketData = {email:user.email,name:user.name,password:user.password}
  this.http.post(`http://localhost:3000/api/sendmail`,ticketData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });


}
envoyermailechinformer(user:User){
  const ticketData = {email:user.email,name:user.name}
  this.http.post(`http://localhost:3000/api/sendmailticket`,ticketData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });


}
envoyermailechinformercloturer(user:User){
  const ticketData = {email:user.email,name:user.name}
  this.http.post(`http://localhost:3000/api/sendmailcloturetechnicien`,ticketData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });


}
envoyermailuser(user:User){
  const ticketData = {email:user.email,name:user.name}
  this.http.post(`http://localhost:3000/api/sendmailuser`,ticketData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });

 
}












  getUser(id:String){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/users/${id}/getuser`,{headers:this.head});
    
    }
  
    ///editTechnicien
  EditUser(user:User,id:string){
    this.head = this.getHeaders().headers;

    const userData = new FormData();
    userData.append('name',user.name);
    userData.append('prenom',user.prenom);
    userData.append('email',user.email);
    userData.append('tel',user.tel);
    userData.append('poste',user.poste);
    userData.append('password',user.password);
    userData.append('type',"utilisateur");
    userData.append('departement_id',user.departement_id);
    userData.append('user_img',user.user_img);


  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
     this.http.put(`http://localhost:3000/api/users/${id}/editUser`,userData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    }); 
  }
  EditAdmin(user:User,id:string){
    this.head = this.getHeaders().headers;
    const userData = new FormData();
    userData.append('name',user.name);
    userData.append('prenom',user.prenom);
    userData.append('email',user.email);
    userData.append('tel',user.tel);
    userData.append('poste',user.poste);
    userData.append('password',user.password);
    userData.append('type',"admin");
    userData.append('departement_id',user.departement_id);
    userData.append('user_img',user.user_img);

  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
     this.http.put(`http://localhost:3000/api/users/${id}/editUser`,userData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    }); 
  }
  EditTechnicien(user:User,id:string){
    this.head = this.getHeaders().headers;
    const userData = new FormData();
    userData.append('name',user.name);
    userData.append('prenom',user.prenom);
    userData.append('email',user.email);
    userData.append('tel',user.tel);
    userData.append('poste',user.poste);
    userData.append('password',user.password);
    userData.append('type',"technicien");
    userData.append('departement_id',user.departement_id);
    userData.append('user_img',user.user_img);

  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
     this.http.put(`http://localhost:3000/api/users/${id}/editUser`,userData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    }); 
  }


  DeleteUser(id:string){
    this.head = this.getHeaders().headers;
    this.http.delete(`http://localhost:3000/api/users/${id}/deleteuser`,{headers:this.head})
    .subscribe(res=>{
      console.log(res);
  
  
   }); 
  }
  
  DeleteTicket(id:string){
    this.head = this.getHeaders().headers;
    this.http.delete(`http://localhost:3000/api/tickets/${id}/deleteticket`,{headers:this.head})
    .subscribe(res=>{
      console.log(res);
  
  
   }); 
  }


  addTicket(description:string,priorite:string,specialite:string,id:string){
    this.head = this.getHeaders().headers;
   // const ticketData = new FormData();
   const ticketData = {description:description,priorite:priorite,specialite:specialite}
  //  ticketData.append('description',description);
    //ticketData.append('priorite',priorite);

  //console.log(description);
    //console.log(userData);
     this.http.post(`http://localhost:3000/api/tickets/${id}/addticket`,ticketData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    });
    
   
  }

  EditTicket(description:string,priorite:string,specialite:string,id:string){
    this.head = this.getHeaders().headers;
    // const ticketData = new FormData();
    const ticketData = {description:description,priorite:priorite,specialite:specialite}
   //  ticketData.append('description',description);
     //ticketData.append('priorite',priorite);
 
   //console.log(description);
     //console.log(userData);
      this.http.put(`http://localhost:3000/api/tickets/${id}/editticket`,ticketData,{headers:this.head})
      .subscribe(res=>{
        console.log(res);
 
 
     });
   }
   EditCloturer(note:string,id:string){
    this.head = this.getHeaders().headers;
    //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);
    const ticketData = {note:note}
      //console.log(userData);
       this.http.put(`http://localhost:3000/api/tickets/${id}/clotureticket`,ticketData,{headers:this.head})
       .subscribe(res=>{
         console.log(res);
    
    
      }); 
    }
   
   EditAffecter(assignetech:string,id:string){
    this.head = this.getHeaders().headers;
    // const ticketData = new FormData();
    const ticketData = {assignetech:assignetech}
   //  ticketData.append('description',description);
     //ticketData.append('priorite',priorite);
 
   //console.log(description);
     //console.log(userData);
      this.http.put(`http://localhost:3000/api/tickets/${id}/affecterautechnicien`,ticketData,{headers:this.head})
      .subscribe(res=>{
        console.log(res);
 
 
     });
   }
 
   EditAffecterautomatique(assignetech:string,id:string,Datecreaation:Date)
   {
    this.head = this.getHeaders().headers;
    // const ticketData = new FormData();
    const ticketData = {assignetech:assignetech,Datecreaation:Datecreaation}
   //  ticketData.append('description',description);
     //ticketData.append('priorite',priorite);
 
   //console.log(description);
     //console.log(userData);
      this.http.put(`http://localhost:3000/api/tickets/${id}/affecterautechnicienautomatiqument`,ticketData,{headers:this.head})
      .subscribe(res=>{
        console.log(res);
 
 
     });
   }


getoneticket(id:string){
  this.head = this.getHeaders().headers;
  return this.http.get<any>(`http://localhost:3000/api/tickets/${id}/getoneticket`,{headers:this.head});
}








  getTicketsTech(id:string){
    
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/tickets/${id}/getTechtickets`,{headers:this.head});
  }


  getTicketsUser(id:string){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/tickets/${id}/getUsertickets`,{headers:this.head});
  }

  getTicketsUsercloturer(id:string){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/tickets/${id}/getUserticketscloturer`,{headers:this.head});
  }




  getStats(){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/users/stats`,{headers:this.head});

  }

  getStatsnombreTechnicien(){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/users/getStatsnombreTechnicien`,{headers:this.head});

  }

  getStatstickets(){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/tickets/statsalltickets`,{headers:this.head});

  }



  getStatstickets2(){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/tickets/statsalltickets2`,{headers:this.head});

  }




  getStatstechtickets(id:string){
    this.head = this.getHeaders().headers;
    return this.http.get(`http://localhost:3000/api/tickets/${id}/statstechtickets`,{headers:this.head});

  }

  getGroupes(){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/groupe/getgroupes`,{headers:this.head});
  }
///:id/getgroupestech
getgroupestech(id:string){
  this.head = this.getHeaders().headers;
  return this.http.get<any>(`http://localhost:3000/api/groupe/${id}/getgroupestech`,{headers:this.head});
}
  getGroupescloturer(){
    this.head = this.getHeaders().headers;
    return this.http.get<any>(`http://localhost:3000/api/groupe/getgroupescloturer`,{headers:this.head});
  }



  addGroupe(specialite:String) {
    this.head = this.getHeaders().headers;
    const GroupeData = {specialite:specialite}
  
  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
     this.http.post(`http://localhost:3000/api/groupe/ajoutergroupe`,GroupeData,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    });
  }

  EditGroupe(specialite:String,id:string) {
    this.head = this.getHeaders().headers;
    const GroupeData = {specialite:specialite}
    this.http.put(`http://localhost:3000/api/groupe/${id}/modifiergroupe`,GroupeData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });
  }
 
  DeleteGroupe(id:string){
    this.head = this.getHeaders().headers;
    this.http.delete(`http://localhost:3000/api/groupe/${id}/deletegroupe`,{headers:this.head})
    .subscribe(res=>{
      console.log(res);
  
  
   });  
  }

  DeleteMembre(groupe:string,id:string){
    this.head = this.getHeaders().headers;
    this.http.put(`http://localhost:3000/api/users/${id}/${groupe}/deleteusergroupe`,{headers:this.head})
    .subscribe(res=>{
      console.log(res);
  
  
   });  
  }



  AffecterTechnicien(groupe_id:String, id: string) {
    this.head = this.getHeaders().headers;
    const GroupeData = {groupe_id:groupe_id}
    this.http.put(`http://localhost:3000/api/users/${id}/affectertechnicien`,GroupeData,{headers:this.head})
    .subscribe(res=>{
      console.log(res);


   });
  }


  getTechniciensofthegroupe(id: string) {
    return this.http.get(`http://localhost:3000/api/users/${id}/getmembreofspecialite`,{headers:this.head});
  }


getspecialite(id: string) {
  return this.http.get(`http://localhost:3000/api/groupe/${id}/getTechnicienspecialite`,{headers:this.head});
}

    getStatsgroupes(){
    return this.http.get(`http://localhost:3000/api/groupe/getgroupesnum`,{headers:this.head});

  }
////////////////////////////////User stats///////////////////////////////////////////
getStatsusernumberoftickets(id:string){
  return this.http.get(`http://localhost:3000/api/tickets/${id}/userticketsnumber`,{headers:this.head});

}
//userticketsnumbercloturer
getStatsusernumberofticketscloturer(id:string){
  return this.http.get(`http://localhost:3000/api/tickets/${id}/userticketsnumbercloturer`,{headers:this.head});

}
getStatsusernumberofticketsnoncloturer(id:string){
  return this.http.get(`http://localhost:3000/api/tickets/${id}/userticketsnumbernoncloturer`,{headers:this.head});

}


gettechnicienticketspercent(){

  ////getnombredeticketpertechnicien
  return this.http.get<any>(`http://localhost:3000/api/users/getnombredeticketpertechnicien`,{headers:this.head})
}
///getnombredeticketcloturerpertechnicien


gettechnicienticketspercentallticket(){

  ////getnombredeticketpertechnicien
  return this.http.get<any>(`http://localhost:3000/api/users/getnombredeticketcloturerpertechnicien`,{headers:this.head})
}

//
gettechnicienticketstotalpercentallticket(){

  ////getnombredeticketpertechnicien
  return this.http.get<any>(`http://localhost:3000/api/users/getnombredetickettotalpertechnicien`,{headers:this.head})
}



////////////////////////Affectation/////////////////////////////////////////////

getAvailabletechnicien(id:String) {
  
  return this.http.get<any>(`http://localhost:3000/api/tickets/${id}/getavailabletechicien`,{headers:this.head})

}

gettimeticketpertechnicien() {
  
  return this.http.get<any>(`http://localhost:3000/api/users/gettimeticketpertechnicien`,{headers:this.head})

}



///getlatestticket


getlatestticket() {
  
  return this.http.get<any>(`http://localhost:3000/api/tickets/getlatestticket`,{headers:this.head})

}

changerertat(id:string){
  this.http.put(`http://localhost:3000/api/tickets/${id}/changeretatencoursdetraitement`,{headers:this.head})
     .subscribe(res=>{
       console.log(res);


    });

 // /:id/changeretatencoursdetraitement
}


////////////////////////////////////groupe/////////////////////////////

getequipeid(id:string){

  return this.http.get<any>(`http://localhost:3000/api/users/${id}/getequipe`,{headers:this.head});
}

///////////////////////////////////nombre de tickets per date////////////////////////////////////////////
//
userticketsnumbernoncloturerperweek(){
  return this.http.get(`http://localhost:3000/api/tickets/userticketsnumbernoncloturerperweek`,{headers:this.head})

}

userticketsnumbernoncloturerperweekedit(datedebut:String,datefin:String){
  
  return this.http.get(`http://localhost:3000/api/tickets/${datedebut}/${datefin}/userticketsnumbernoncloturerperweekedit`,{headers:this.head})

}

////////////////////////nombre de ticket total////////////////////////////////////




allticketsnumber() {
  
  return this.http.get<any>(`http://localhost:3000/api/tickets/allticketsnumber`,{headers:this.head})

}


//////////////////////number of tickets today///////////////////////////////
//numberofticketstoday
numberofticketstoday() {
  
  return this.http.get<any>(`http://localhost:3000/api/tickets/numberofticketstoday`,{headers:this.head})

}

}

