import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaravelserviceService {

  urlBase = 'http://localhost:8000/';
  urlSuite = 'listeMessage';

  constructor(private http: HttpClient) { }

  getListeMessage(){
    return this.http.get(this.urlBase + this.urlSuite);
  }

  getConversation(idclient: any){
    this.urlSuite = 'messageAdmin?idclient='+idclient;
    return this.http.get(this.urlBase + this.urlSuite);
  }

  saveConversation(idclient: any, messages: any){
    let input = {
      idclientsreceive : idclient,
      messages : messages
    }
    this.urlSuite = 'ajoutMessageAdmin-'+idclient+'-'+messages;
    return this.http.post(this.urlBase+this.urlSuite, input);
  }

  getClient(idclient: any){
    this.urlSuite = 'getclient?idclient='+idclient;
    return this.http.get(this.urlBase+this.urlSuite);
  }

  statistiqueProduitprix(){
    this.urlSuite = 'statProduitsprix';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  getNotificationEnvoye(){
    this.urlSuite = 'notif/commande?etat=1';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  getDetailProduit(id: any){
    this.urlSuite = 'notif/produit?id='+id;
    return this.http.get(this.urlBase+this.urlSuite);
  }

  validerCommandeProduit(id: any, email: any){
    this.urlSuite = 'notif/valider?idDevis='+id;
    return this.http.post(this.urlBase + this.urlSuite, id);
  }

  getRendezvous(){
    this.urlSuite = 'rdv/notif?etat=0';
    return this.http.get(this.urlBase + this.urlSuite);
  }

  getAllRendezvous(){
    this.urlSuite = 'rdv/allRdv';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  getDetailRendezvous(id: any){
    this.urlSuite = 'rdv/rendezvous?idRdv='+id;
    return this.http.get(this.urlBase+this.urlSuite);
  }

  getRendezvousByDate(daterdv: any){
    this.urlSuite = 'rdv/rdvDate?daterdv='+daterdv;
    return this.http.get(this.urlBase+this.urlSuite);
  }

  updateRdv(idRdv: any, etat: any, mailclient: any){
    this.urlSuite = 'rdv/actionBtn?idRdv='+idRdv+'&etat='+etat;
    return this.http.post(this.urlBase+this.urlSuite, idRdv);
  }

  duplicataDateheureRdv(){
    this.urlSuite = 'rdv/controleduplicata';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  loginApk(email: any, pass: any, iduserrole: any){
    let input = {
      email: email,
      pass: pass,
      iduserrole: iduserrole
    }
    this.urlSuite = 'log/login?email'+email+'&mdp='+pass+'&role='+iduserrole;
    return this.http.post(this.urlBase + this.urlSuite, input);
  }

  getToken(idclient: any){
    this.urlSuite = 'log/token?idclient='+idclient;
    return this.http.get(this.urlBase+this.urlSuite);
  }

}
