import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';
import { HostListener } from "@angular/core";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

import { DOCUMENT } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filtercount'
})

@Component({
  selector: 'app-pagados',
  templateUrl: './pagados.component.html',
  styleUrls: ['./pagados.component.css']
})
export class PagadosComponent implements OnInit {

  autos: AutoModel[] = [];
  usuarios: UsuarioModel[] = [];
  
  p: number = 1; // iniciar variable crear paginacion

  public total;

  constructor( private autosService: AutosService,
               private auth: AuthService,
               private router:Router,
               private usuariosService: UsuariosService   ) { }

  filterPost= '';  //

  @HostListener('onkeyup') doSomething(){
    console.log('Hola ticket');
  }

  ngOnInit() {

  
  this.autosService.getAutos().subscribe( resp => this.autos = resp);
  this.usuariosService.getUsuarios().subscribe( resp => this.usuarios = resp);
  this.total= this.autos.reduce((prev,next)=>prev+next.monto*1,0);
  console.log('el total= '+ this.total);
  
}



public totalx(){

      //Calculamos el TOTAL 
      let suma = 0;
      for (let car in this.autos){
          if(this.autos[car].monto!=null){
            suma = suma + this.autos[car].monto
            //console.log(suma);
          }
      }
        return suma;
}


public downloadPDFDiario():void {
  //let DATA = this.htmlData.nativeElement;
  let DATA = document.getElementById("htmlData");
  let CAJA = document.getElementById("caja");
  let doc = new jsPDF();


  doc.text("Reporte",90,30);
  //doc.fromHTML(DATA,15,15);
  doc.text("Control de acceso de Automoviles",55,50);
  doc.text("Ingresos Diarios",80,70);
  doc.fromHTML(CAJA, 95,75);
  //doc.autoTable({ html: '#htmlData', columns: [[ 'Codigo' ],['Patente'],['Fecha Entrada'],['Fecha Salida'],['Hora Entrada'],['Hora Salida'],['Minutos'],['Monto']]  });
  doc.output('dataurlnewwindow');

  //doc.save('angular-demo.pdf');
}

public downloadPDFSemanal():void {
  //let DATA = this.htmlData.nativeElement;
  let DATA = document.getElementById("htmlData");
  let CAJA = document.getElementById("cajasemanal");
  let doc = new jsPDF();


  doc.text("Reporte",90,30);
  //doc.fromHTML(DATA,15,15);
  doc.text("Control de acceso de estacionamiento",55,50);
  doc.text("Ingresos Semanal",80,70);
  doc.fromHTML(CAJA, 95,75);
  //doc.autoTable({ html: '#htmlData', columns: [[ 'Codigo' ],['Patente'],['Fecha Entrada'],['Fecha Salida'],['Hora Entrada'],['Hora Salida'],['Minutos'],['Monto']]  });
  doc.output('dataurlnewwindow');

  //doc.save('angular-demo.pdf');
}

public downloadPDFMensual():void {
  //let DATA = this.htmlData.nativeElement;
  let DATA = document.getElementById("htmlData");
  let CAJA = document.getElementById("cajamensual");
  let doc = new jsPDF();


  doc.text("Reporte",90,30);
  //doc.fromHTML(DATA,15,15);
  doc.text("Control de acceso de estacionamiento",55,50);
  doc.text("Ingresos Mensual",80,70);
  doc.fromHTML(CAJA, 95,75);
  //doc.autoTable({ html: '#htmlData', columns: [[ 'Codigo' ],['Patente'],['Fecha Entrada'],['Fecha Salida'],['Hora Entrada'],['Hora Salida'],['Minutos'],['Monto']]  });
  doc.output('dataurlnewwindow');

  //doc.save('angular-demo.pdf');
}

public downloadPDF():void {
  //let DATA = this.htmlData.nativeElement;
  let DATA = document.getElementById("htmlData");
  //let CAJA = document.getElementById("caja");
  let doc = new jsPDF();


  doc.text("Control de acceso de Automoviles",70,9);
  //doc.fromHTML(DATA,15,15);
  //console.log('la caja'+this.obtenerCaja);
  //doc.text("Ingresos Diarios",15,30);
  //sdoc.fromHTML(CAJA, 15,35);
  doc.autoTable({ html: '#htmlData', columns: [[ 'Codigo' ],['Patente'],['Fecha Entrada'],['Fecha Salida'],['Hora Entrada'],['Hora Salida'],['Minutos'],['Monto']]  });
  doc.output('dataurlnewwindow');

  //doc.save('angular-demo.pdf');
}


elUsuario(correo: String){
  for (let user in this.usuarios){  
    //console.log('el usuario es: '+this.usuarios[user].email);
    //console.log('el correo'+correo);
    if (correo==this.usuarios[user].email){
      //console.log('encontro el correo:' + correo);
      let rol = this.usuarios[user].rol;
      //console.log(rol);
      return rol     
      }
    } 
}

borrarAuto( auto: AutoModel, i:number ){

  Swal.fire({
    title: '¿Esta seguro?',
    text: `Esta seguro que desea eliminar a ${ auto.patente}`,
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( resp=> {
      if ( resp.value){
        
        this.autos.splice(i, 1);  //borrar del arreglo
        this.autosService.borrarAuto( auto.id ).subscribe();

      }

  })
}

MostrarFoto( auto: AutoModel, i:number){

  Swal.fire({
    imageUrl: auto.foto,
    imageWidth: 500,
    imageAlt: 'Foto Auto'
  })

}

obtenerCaja(  ){

  let suma = 0;
  var hoy = new Date();
  let dia_actual=hoy.getDate();
  console.log('dia hoy'+dia_actual);
  let dia_actualx= dia_actual.toString();
  let mes_actual=hoy.getMonth()+1;
  //console.log('el mes actual: '+mes_actual);
  let mes_actualx=mes_actual.toString();
  //console.log('el mes actualx: '+mes_actualx);
  //console.log('el dia actual es:'+dia_actual);

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
        let dia_ticket2=parseInt(dia_ticket,10);
        let dia_ticket3=dia_ticket2.toString();
        //console.log('dia ticket 2==='+dia_ticket2);

        let diax = dia_actual.toString();
        //console.log('tipo de dato actual diax'+typeof(diax));
        let mes_ticket1=parseInt(mes_ticket,10);
        let mes_ticket2=mes_ticket1.toString();
     //   console.log('el mes actualx1: '+mes_ticket2);
            console.log('dia actual: '+dia_actualx);
            console.log('dia actualx: '+dia_ticket);
            console.log('mes actual: '+mes_actualx);

            if ((this.autos[car].activo==false)&&(dia_actualx==dia_ticket3)&&(mes_ticket2==mes_actualx)){

                suma = suma + this.autos[car].monto;
                let monto = this.autos[car].monto;
                console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
      
        }
      }
  }
  return suma
}

public downloadPDFX():void {
  //let DATA = this.htmlData.nativeElement;
  let DATA = document.getElementById("htmlData");
  let CAJA = document.getElementById("caja");
  let doc = new jsPDF();


  doc.text("Listado",15,15);
  //doc.fromHTML(DATA.innerHtml,15,15);
  console.log('la caja'+this.obtenerCaja);
  doc.text("Ingresos Diarios",15,30);
  doc.fromHTML(CAJA, 15,35);
  
  //doc.autoTable({ html: '#htmlData' })

  doc.output('dataurlnewwindow');

  //doc.save('angular-demo.pdf');
}


obtenerCajaMensual(  ){

  let suma = 0;
  var hoy = new Date();
  let dia_actual=hoy.getDate();
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

            if ((this.autos[car].activo==false)&&(mes_ticket2==mes_actualx)){

                suma = suma + this.autos[car].monto;
                let monto = this.autos[car].monto;
      //          console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
      
        }
      }
  }
  return suma
}

obtenerCajaSemanal( ){

  let suma = 0;
  var hoy = new Date();
  let dia_actual=hoy.getDate();
  let dia=hoy.getUTCDay();
  let mes_actual2=hoy.getMonth()+1;
  //console.log('el mes actual: '+mes_actual);
  let mes_actualx2=mes_actual2.toString();
  
  let caja_semana=0;


  let mes=[31,28,31,30,31,30,31,31,30,31,30,31]

  let dia1=0;
  let dia2=0;
  let dia3=0;
  let dia4=0;
  let dia5=0;
  let dia6=0;
  let dia7=0;

  let dia_actualx= dia_actual.toString();
  let mes_actual=hoy.getMonth()+1;
  console.log(dia_actual);
  console.log(dia);
  if (dia==1){
      caja_semana=this.obtenerCajadiax(dia);
  }

  if (dia==2){
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia4+dia5;
  }


  if (dia==3){
    dia3=this.obtenerCajadiax(parseInt(dia_actualx)-2);
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia3+dia4+dia5;
  }


  if (dia==4){
    dia2=this.obtenerCajadiax(parseInt(dia_actualx)-3);
    dia3=this.obtenerCajadiax(parseInt(dia_actualx)-2);
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia2+dia3+dia4+dia5;
  }


  if (dia==5){
    dia1=this.obtenerCajadiax(parseInt(dia_actualx)-4);
    dia2=this.obtenerCajadiax(parseInt(dia_actualx)-3);
    dia3=this.obtenerCajadiax(parseInt(dia_actualx)-2);
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia1+dia2+dia3+dia4+dia5;
  }

  if (dia==6){
    dia6=this.obtenerCajadiax(parseInt(dia_actualx)-5);
    dia1=this.obtenerCajadiax(parseInt(dia_actualx)-4);
    dia2=this.obtenerCajadiax(parseInt(dia_actualx)-3);
    dia3=this.obtenerCajadiax(parseInt(dia_actualx)-2);
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia1+dia2+dia3+dia4+dia5+dia6;
  }

  if (dia==0){
    dia7=this.obtenerCajadiax(parseInt(dia_actualx)-6);
    dia6=this.obtenerCajadiax(parseInt(dia_actualx)-5);
    dia1=this.obtenerCajadiax(parseInt(dia_actualx)-4);
    dia2=this.obtenerCajadiax(parseInt(dia_actualx)-3);
    dia3=this.obtenerCajadiax(parseInt(dia_actualx)-2);
    dia4=this.obtenerCajadiax(parseInt(dia_actualx)-1);
    dia5=this.obtenerCajadiax(dia_actualx);
    caja_semana=dia1+dia2+dia3+dia4+dia5+dia6+dia7;
  }

  //console.log('el mes actual: '+mes_actual);
  let mes_actualx=mes_actual.toString();
  //console.log('el mes actualx: '+mes_actualx);
  //console.log(dia_actual);
  
  return caja_semana
}

obtenerCajadiax( dia_actualx ){

  let suma = 0;
  var hoy = new Date();
  let dia_actual=hoy.getDate();
  let diax= dia_actualx;
  let mes_actual=hoy.getMonth()+1;
  //console.log('el mes actual: '+mes_actual);
  let mes_actualx=mes_actual.toString();
  //console.log('el mes actualx: '+mes_actualx);
  //console.log('el dia actual:'+diax);

  for( let car in this.autos){
    
    if (this.autos[car].fecha_salida!=null){
        let dia = this.autos[car].fecha_salida;
    //    console.log(typeof(dia));
        //console.log('el dias del ticket es:'+dia);
        let dia_ticket = dia.toString().slice(8,10);
        let mes_ticket = dia.toString().slice(5,7);
        let mes_ticket1=parseInt(mes_ticket,10);
        let mes_ticket2=mes_ticket1.toString();

        let dia_ticket2=parseInt(dia_ticket,10);
        let dia_ticket3=dia_ticket2.toString();
     //   console.log('el mes actualx1: '+mes_ticket2);

            if ((this.autos[car].activo==false)&&(diax==dia_ticket3)&&(mes_ticket2==mes_actualx)){

                suma = suma + this.autos[car].monto;
                let monto = this.autos[car].monto;
      //          console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
      
        }
      }
  }
  return suma
}


}
