import { Component, OnInit } from '@angular/core';

import { AutoModel } from 'src/app/models/auto.model';
import { AutosService } from 'src/app/services/autos.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfiguracionModel } from 'src/app/models/configuracion.model';
import { AutosComponent } from '../autos/autos.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  autos: AutoModel[] = [];
  configuracion: ConfiguracionModel[] = [];

  constructor(private configService: ConfigService,
              private autosService: AutosService) { }

  ngOnInit() {

    this.autosService.getAutosreverse().subscribe( resp => this.autos = resp);
    this.configService.getConfigs().subscribe( resp => this.configuracion = resp);


  }


  obtenerAutos( ){

    let cantidad = 200;

    for( let car in this.autos){

       if (this.autos[car].activo==true){

        cantidad = cantidad - 1;
        //suma = suma + this.DatosCaja( this.autos[car] );
        //let monto = this.DatosCaja( this.autos[car] );
        //console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
    
       }
    }
    return cantidad
  }


  ObtenerCosto( codigox: String ){

    let tupla: [String, number, String, String];

    console.log("el codigo es: "+codigox);
    if (codigox==''){
        tupla = ["-", 0, "-", "-"];
        return tupla
    }

    for (let i in this.autos){
      //console.log(i);
      //console.log(codigox);
      //console.log(this.autos[i].codigo);
      //console.log(this.autos[i].patente);
      //console.log(this.autos[i].hora);
      let codigox2 = 'B'+codigox;
      let code = this.autos[i].codigo;
      if((((this.autos[i].patente.toUpperCase()==codigox.toUpperCase())||(code.toUpperCase()==codigox.slice(0,13).toUpperCase()))&&(this.autos[i].monto==null))
          ||(((this.autos[i].codigo.toUpperCase()==codigox2.slice(0,13).toUpperCase()))&&(this.autos[i].monto==null))){
      
        console.log("encontro ticket");
        var hoy = new Date();
        let dia_actual=hoy.getDate();
        //let hora = hoy.getHours()+':'+hoy.getMinutes();
        let hora_actual= hoy.getHours();
        let minutos_actual=hoy.getMinutes();
        let mes_actual=hoy.getMonth()+1;
        //let hora = hora_actual.toString()+":"+minutos_actual.toString();
        //console.log(hoy);
        //let fechax = this.autos[i].fecha;
        let mes_ticket = parseInt(this.autos[i].fecha.slice(5,7),10);
        let dia_ticket = parseInt(this.autos[i].fecha.slice(8,10),10)
        let hora_ticket = parseInt(this.autos[i].hora.slice(0,2),10);
        let minutos_ticket = parseInt(this.autos[i].hora.slice(3,5),10);
        
        let mes=[31,28,31,30,31,30,31,31,30,31,30,31]
        let total_meses = mes_actual - mes_ticket;
        let total_dias = dia_actual - dia_ticket;
        let total_minutos = 1440*mes[mes_ticket-1]*(total_meses)+1440*(total_dias)+60*(hora_actual - hora_ticket)+(minutos_actual - minutos_ticket);
     
        let valor = this.configuracion[0].valor_minuto;
        let max_dia = this.configuracion[0].cobro_max_dia;
        let valor_dia = this.configuracion[0].valor_dia;
        //console.log(fechax);      
        //console.log("el valor: "+valor);
        //console.log("total meses: "+mes_ticket);
        //console.log("total dias: "+dia_ticket);
        console.log("total minutos: "+total_minutos);
        //    let monto = 12*total_minutos;
        //console.log('El valor del monto');
        //console.log(valor);
        let monto = valor*total_minutos;
    
        //console.log(mes[mes_ticket-1]);
    
    //    if((total_minutos>834)&&(total_minutos<=1440)){
        if((monto>max_dia)&&(total_minutos<=1440)){
          monto=max_dia;
        }
    
        if(total_minutos>1440){
            monto=max_dia+Math.trunc((total_minutos-1440)/1440)*valor_dia;
            let minutos=(total_minutos-1440)%1440;
            if (minutos>0){
              monto=monto+valor_dia;
            }
    
        }
    
        let redondeo=monto;
    
        while(redondeo>=10){
          redondeo=redondeo%10;
        }
        //console.log(redondeo);
        if (redondeo>=5){
          monto=monto+10-redondeo;
        }
        else{
          monto=monto-redondeo;
        }
        //console.log("Encontro el ticket minutos:"+minutos_ticket);
        console.log("Encontro el ticket monto:"+monto);

        tupla = [('$'+monto), total_minutos , this.autos[i].hora, this.autos[i].fecha.slice(0,10)];
        return tupla
    
      }
     
      }
      tupla = ["No se encontro ticket", 0, "-", "-"];
      return tupla
  }
}
