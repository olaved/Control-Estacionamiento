import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AutosService {

  private url='https://raspberry-bf5f5.firebaseio.com';

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

}
