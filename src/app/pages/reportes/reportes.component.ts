import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';
import { HostListener } from "@angular/core";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { ReporteService } from 'src/app/services/reporte.service';


import * as jsPDF from 'jspdf';
import { DOCUMENT } from '@angular/common';
import { ReporteModel } from 'src/app/models/reporte.model';
import { timeEnd } from 'console';
import { timeout } from 'rxjs/operators';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  autos: AutoModel[] = [];
  usuarios: UsuarioModel[] = [];
  reportes: ReporteModel[] = [];
  reporte: ReporteModel = new ReporteModel();

  constructor( private autosService: AutosService,
               private auth: AuthService,
               private router:Router,
               private usuariosService: UsuariosService,
               private reporteService: ReporteService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    this.autosService.getAutos().subscribe( resp => this.autos = resp);
    this.usuariosService.getUsuarios().subscribe( resp => this.usuarios = resp);
    this.reporteService.getReportes().subscribe( resp => this.reportes = resp);
    this.reporteDiario();
    
  }

  reporteDiario(  ){

    var hoy = new Date();
    let hoy2 = hoy.toString().slice(4,15);
    let dia = hoy.toString().slice(8,10);
    let diax = parseInt(dia);

    let hora = hoy.toString().slice(16,24);

    console.log('la hora es: '+ hora);
    console.log('El dia actual es: ' + diax);
    console.log(hoy2);
    //let dia=14;
    //this.reportes[0].caja=500;
    for (let report in this.reportes){ 
      for(let x=0; x<=diax; x++){
        if((this.reportes[report].fecha!=hoy2)&&(this.reportes[report].caja!=0)){
        //if(hora=='20:29:35'){
         const id = this.route.snapshot.paramMap.get('id');  //a las rutas
        //for (let dia=0; dia<=31; dia++){
        //for( let report in this.reportes){
         let caja = this.obtenerCaja(diax);
         console.log('el dia es: ' +hoy+ '  la caja es: '+caja);
         this.reporteService.crearReporte( this.reporte, caja, hoy2 ).subscribe();
         ///this.reporteService.crearReporte( this.reportes[dia], hoy ).subscribe();
        //} 
         //}
        }}
    }
  }

  obtenerCaja(dia:number ){

    let suma = 0;
    var hoy = new Date();
    let dia_actual=dia;
    let dia_actualx= dia_actual.toString();
    let mes_actual=hoy.getMonth()+1;
    //console.log('el mes actual: '+mes_actual);
    let mes_actualx=mes_actual.toString();
    //console.log('el mes actualx: '+mes_actualx);
    //console.log(dia_actual);
  
    for( let car in this.autos){
      
      if (this.autos[car].fecha_salida!=null){
          let dia = this.autos[car].fecha_salida;
      //    console.log(typeof(dia));
          let dia_ticket = dia.toString().slice(8,10);
          let mes_ticket = dia.toString().slice(5,7);
      //    console.log('el mes del ticket'+mes_ticket);
      //    console.log('el mes del ticket'+mes_actualx);
          //console.log('tipo dato dia salida'+typeof(dia_ticket));
          //console.log('tipo de dato actual'+typeof(dia_actualx));
          //console.log('el dia del ticket: '+dia_ticket);
          //console.log('dia actual: '+dia_actual);
          let diax = dia_actual.toString();
          //console.log('tipo de dato actual diax'+typeof(diax));
          let mes_ticket1=parseInt(mes_ticket,10);
          let mes_ticket2=mes_ticket1.toString();
       //   console.log('el mes actualx1: '+mes_ticket2);
  
              if ((this.autos[car].activo==false)&&(dia_actualx==dia_ticket)&&(mes_ticket2==mes_actualx)){
  
                  suma = suma + this.autos[car].monto;
                  let monto = this.autos[car].monto;
        //          console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
        

          }
        }
    }
    return suma
  }
}
