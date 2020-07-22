import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ReporteModel } from '../models/reporte.model';
import { AutoModel } from '../models/auto.model';
import { CobroModel } from '../models/cobro.model';

import { ConfigService } from 'src/app/services/config.service';
import { ConfiguracionModel } from 'src/app/models/configuracion.model';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {


    private url='https://raspberry-bf5f5.firebaseio.com';
    autos: any;
  
    constructor( private http: HttpClient) { }

    ngOnInit() {

    }

    crearReporte( reporte: ReporteModel, caja:number, fecha: String ){

      let cajax = caja; 
      if (cajax!=0){
          reporte.caja=cajax;
          reporte.fecha=fecha;
          console.log(reporte);
          console.log('la caja es: '+cajax);
          //reporte.fecha=fecha;
          return this.http.post(`${ this.url }/reportes.json`, reporte);
      }
    }

    getReportes(){
      return this.http.get(`${this.url}/reportes.json`).pipe(
        map( resp=> this.crearArreglo(resp)));
    }
  
    private crearArreglo( reportesObj: object){
      
      const reportes: ReporteModel[] = [];
      console.log( reportesObj);
      Object.keys( reportesObj ).forEach( key =>{
        const reporte: ReporteModel = reportesObj[key];
        reporte.id = key;
        reportes.push(reporte);
      });
   
      return reportes;
    }

}
