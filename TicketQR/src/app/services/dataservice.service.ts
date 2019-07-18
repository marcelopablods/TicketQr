import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  //url:string = "https://ws-qr-cruce.a5/api/";
  url:string = "http://localhost:65108/api/";
  //10.1.22.14
  data:any;
  constructor(private http: HttpClient) { }

  //GetInfoQr
  getInfoPasajero(IdVentaRegularPasajero:any,idUsuario:any){
    let urlApi = this.url+"Ticket/validarTicket?idVentaRegularPasajero="+IdVentaRegularPasajero+"&idUsuario="+idUsuario+"";
    return this.http.get(urlApi);
  }

  //Update
  abordarPasajero(_idVentaRegularPasajero:any, _idUsuario:any){
    let urlApi = this.url+"Ticket/abordarPasajero?idVentaRegularPasajero="+_idVentaRegularPasajero+"&idUsuario="+_idUsuario+"";
    return this.http.post(urlApi,{IdVentaRegularPasajero: _idVentaRegularPasajero,IdUsuario:_idUsuario});
  }
}
