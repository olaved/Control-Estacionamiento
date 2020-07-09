import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionModel } from '../models/configuracion.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    private url='https://raspberry-bf5f5.firebaseio.com';
  
    constructor( private http: HttpClient) { }
  
    crearConfig( config: ConfiguracionModel){
      return this.http.post(`${ this.url }/configuracion.json`, config).pipe(
        map( (resp:any) =>{
          config.id= resp.name;
          //console.log(config.id);
          console.log(config);
          return config;
        })
      );
    }


    getConfig(id: string){

      return this.http.get(`${this.url}/configuracion/${id}.json`);
      
    }

    obtenerConfig(id: string){

      let datos = this.http.get(`${this.url}/configuracion/${id}.json`);
      console.log(datos);
    }


    actualizarConfig( config:ConfiguracionModel){

      const configTemp = {
        ...config
      };
  
      delete configTemp.id;
  
      return this.http.put(`${this.url}/configuracion/${config.id}.json`, configTemp);
    }

    getConfigs(){
      return this.http.get(`${this.url}/configuracion.json`).pipe(
        map( resp=> this.crearArreglo(resp)));
    }
  

    private crearArreglo( configObj: object){
      
      const configs: ConfiguracionModel[] = [];
      console.log( configObj);
      Object.keys( configObj ).forEach( key =>{
        const conf: ConfiguracionModel = configObj[key];
        conf.id = key;
        configs.push(conf);
      });
   
      return configs;
    }
  }
