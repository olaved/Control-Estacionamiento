import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';
import { map } from 'rxjs/operators';
import { CobroModel } from '../models/cobro.model';

@Injectable({
  providedIn: 'root'
})

export class AutosService {

  private url='https://raspberry-bf5f5.firebaseio.com';
  autos: any;

  constructor( private http: HttpClient) { }

  crearAuto( auto: AutoModel){
    return this.http.post(`${ this.url }/autos.json`, auto).pipe(
      map( (resp:any) =>{
        auto.id= resp.name;
        return auto;
      })
    );
  }


   borrarAuto( id:string ){

    return this.http.delete(`${ this.url }/autos/${ id }.json`);
   }


   actualizarAuto( auto:AutoModel){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;

    return this.http.put(`${this.url}/autos/${auto.id}.json`, autoTemp);
  }
  
  getAuto(id: string){

    return this.http.get(`${this.url}/autos/${id}.json`);
  }


  getAutos(){
    return this.http.get(`${this.url}/autos.json`).pipe(
      map( resp=> this.crearArreglo(resp)));
  }

  private crearArreglo( autosObj: object){
    
    const autos: AutoModel[] = [];
    console.log( autosObj);
    Object.keys( autosObj ).forEach( key =>{
      const auto: AutoModel = autosObj[key];
      auto.id = key;
      autos.push(auto);
    });
 
    return autos;
  }

/*   crearPago( auto:AutoModel, monto:number){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;

    let pago = [];

    pago.push(monto);
    pago.push("minutos");

    return this.http.put(`${this.url}/autos/${auto.id}/pago/monto.json`, pago);
  }
*/

  cambioEstado( auto:AutoModel, activo:boolean){

 
    return this.http.put(`${this.url}/autos/${auto.id}/activo.json`, activo);
  }


   crearMonto( auto:AutoModel, monto:number){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;
    return this.http.put(`${this.url}/autos/${auto.id}/monto.json`, monto);
  }

  crearMinutos( auto:AutoModel, minutos:number){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;

    return this.http.put(`${this.url}/autos/${auto.id}/minutos.json`, minutos);
  }

  horaSalida( auto:AutoModel, dia:Date){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;
    
    return this.http.put(`${this.url}/autos/${auto.id}/fecha_salida.json`, dia);
  }

  ticketPagado( auto:AutoModel, pagado:boolean){

    const autoTemp = {
      ...auto
    };

    delete autoTemp.id;
    
    return this.http.put(`${this.url}/autos/${auto.id}/pagado.json`, pagado);
  }

  buscarTicket( termino: string):AutoModel[]{

    let ticketArr:AutoModel[] = [];
    termino=termino.toLowerCase();

    for( let auto of this.autos){
      
      let nombre = auto.name.toLowerCase();
      
      if (nombre.indexOf(termino)>=0){
        ticketArr.push(auto)
      }

    }
    return ticketArr;
  }

}