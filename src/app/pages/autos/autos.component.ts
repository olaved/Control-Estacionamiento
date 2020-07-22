import { Component, OnInit, ViewChild } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';
import { CobroModel } from 'src/app/models/cobro.model';
import { HostListener } from "@angular/core";

import { ConfigService } from 'src/app/services/config.service';
import { ConfiguracionModel } from 'src/app/models/configuracion.model';
import { config } from 'process';
import { ConfigComponent } from '../config/config.component';
import { RouterLink, Router } from '@angular/router';
import { observable } from 'rxjs';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  autos: AutoModel[] = [];
  configuracion: ConfiguracionModel[] = [];
  usuarios: UsuarioModel[] = [];

  p: number = 1;

  constructor( private autosService: AutosService,
               private configService: ConfigService,
               private auth: AuthService,
              private usuariosService: UsuariosService ) { }

  filterPost= '';  //
  ngOnInit() {
  //llamar a todo el arreglo de config, y despues llamar en la posicion let valor = this.configuracion[0].valor_minuto;
  this.configService.getConfigs().subscribe( resp => this.configuracion = resp);
  this.autosService.getAutos().subscribe( resp => this.autos = resp);
  this.usuariosService.getUsuarios().subscribe( resp => this.usuarios = resp);

}


elUsuario(correo: String){
  for (let user in this.usuarios){  
    //console.log(this.usuarios[user].email);
    // console.log(correo);
    if (correo==this.usuarios[user].email){
      let rol = this.usuarios[user].rol;
      //console.log('encontro el correo:' + correo+'y el rol es: '+rol);
      // console.log(rol);
      return rol     
      }
    } 
}
  /*
  lastPressed = 'nothing';
  word = '';
  @HostListener('window:keydown', ['$event.key'])
  next(key: string) {
    this.lastPressed = key;
    this.word =this.word + key;
    console.log(this.word);
    //if ((this.word.length)>10){
      //console.log(this.autos);
       //console.log(this.autos[i].codigo);
       if((this.word.indexOf("Enter")>-1)){
         function reverseString(str) {
         return str.split('').reverse().join('');
         }
         //console.log('contiene el codigo');
         //console.log(this.word);
         let code = this.word.replace("Enter","");
         let codeinvertido = reverseString(code);
         codeinvertido = codeinvertido.slice(0,13);
         code = reverseString(codeinvertido);
         console.log(code);
         this.word='';
         for (let i in this.autos){
            if (code == this.autos[i].codigo){
              //console.log("Encontro el codigo");
              if( this.autos[i].pagado != true){
                this.pagarAuto(this.autos[i], 0 );
              }
            }
       }
    }
  }

*/

lastPressed = 'nothing';
word = '';
@HostListener('window:keydown', ['$event.key'])
next(key: string) {
  this.lastPressed = key;
  this.word =this.word.replace("Shift","") + key;
  console.log(this.word);
  //if ((this.word.length)>10){
    //console.log(this.autos);
     //console.log(this.autos[i].codigo);
     if((this.word.indexOf("Enter")>-1)){
       function reverseString(str) {
       return str.split('').reverse().join('');
       }
       //console.log('contiene el codigo');
       console.log(this.word);
       let code = this.word.replace("Enter","");
       console.log(code);
       let codeinvertido = reverseString(code);
       codeinvertido = codeinvertido.slice(0,12);     
       code = reverseString(codeinvertido);
       //console.log(code);
       this.word='';
       for (let i in this.autos){
          if (code == this.autos[i].codigo){
            //console.log("Encontro el codigo");
            if( this.autos[i].pagado != true){
              this.pagarAuto(this.autos[i], 0 );
            }
          }
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
          Swal.fire({
            icon:'success',
            html: `<h3>Ticket eliminado satisfactoriamente </h3></br>`,
            showConfirmButton: true,
            })
          location.reload();
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


  pagarAuto( auto: AutoModel, i:number ){
 
    var hoy = new Date();
    let dia_actual=hoy.getDate();
    //let hora = hoy.getHours()+':'+hoy.getMinutes();
    let hora_actual= hoy.getHours();
    let minutos_actual=hoy.getMinutes();
    let mes_actual=hoy.getMonth()+1;
    //let hora = hora_actual.toString()+":"+minutos_actual.toString();
    //console.log(hoy);

    let mes_ticket = parseInt(auto.fecha.slice(5,7),10);
    let dia_ticket = parseInt(auto.fecha.slice(8,10),10)
    let hora_ticket = parseInt(auto.hora.slice(0,2),10);
    let minutos_ticket = parseInt(auto.hora.slice(3,5),10);
    
    let mes=[31,28,31,30,31,30,31,31,30,31,30,31]
    let total_meses = mes_actual - mes_ticket;
    let total_dias = dia_actual - dia_ticket;
    let total_minutos = 1440*mes[mes_ticket-1]*(total_meses)+1440*(total_dias)+60*(hora_actual - hora_ticket)+(minutos_actual - minutos_ticket);
 
    let valor = this.configuracion[0].valor_minuto;
    let max_dia = this.configuracion[0].cobro_max_dia;
    let valor_dia = this.configuracion[0].valor_dia;
    
    //    let monto = 12*total_minutos;
    console.log('El valor del monto');
    console.log(valor);
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



  /*  console.log(hoy);
    console.log(mes_actual);
    console.log(mes_ticket);
    console.log(dia_actual);
    console.log(dia_ticket);
    console.log(total_dias);
    console.log(dia_ticket);
    console.log(hora_ticket);
    //console.log(hora);
    console.log(minutos_ticket);
    console.log(total_minutos);
   */// console.log(hora);


    Swal.fire({
      title: '<h3>Desea pagar este servicio?</h3>',
      //text: `Total de minutos ${ total_minutos }` +  `Monto a cancelar  ${ monto }`,
      html: `</br> <h5 style="color:">Patente</h5> <h3> ${auto.patente.toUpperCase()}</h3> </br> <h5>Total de minutos</h5> <h4>${ total_minutos }</h4>` + `</br><h5>Monto a cancelar</h5> <h4>$${ monto }</h4>
      </br>` ,
      icon: 'info',
 
      
      showConfirmButton: true,
      allowEnterKey: false,
      showCancelButton: true,
 

    }).then( async resp=> {

        if ( resp.value){

          const ipAPI = '//api.ipify.org?format=json'

          const inputValue = fetch(ipAPI)
            .then(response => response.json())
            .then(data => data.ip)
          
          const { value: dinero } = await Swal.fire({
            title: 'Calcular vuelto?',
            html: `</br> <h5>Monto a Cancelar</h5> <h3>$${ monto }</h3>
            </br> <h5>Ingrese cantidad pagada</h5>`,
            input: 'number',
            inputValue: inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Ingrese un monto'
              }
              if (parseInt(value)<monto){
                return 'El monto es mayor que lo pagado'
              }
              if (parseInt(value)>500000){
                return 'El monto es demasiado grande'
              }
            }

          })
          
          if (dinero) {          
            let valor=parseInt(dinero);
            let vuelto= valor-monto;


            Swal.fire({
            icon:'success',
            html: `<h3>Se a cancelado satisfactoriamente </h3></br></br><p>El vuelto es </p> <h4>$${vuelto}</h4>`,
            })
            
          
            auto.activo=false;
            let estado: boolean=false;
            let pagado: boolean=true;
            //this.autos.splice(i, 1);  //borrar del arreglo
            
            this.autosService.crearMonto( auto , monto).subscribe();
            this.autosService.crearMinutos( auto , total_minutos).subscribe();
            this.autosService.horaSalida( auto , hoy).subscribe();
            this.autosService.cambioEstado( auto , estado ).subscribe();
            this.autosService.ticketPagado( auto , pagado ).subscribe();
        }
        }

    })


  }

  obtenerCaja( ){

    let suma = 0;

    for( let car in this.autos){

       if (this.autos[car].activo==true){

        suma = suma + this.DatosCaja( this.autos[car] );
        let monto = this.DatosCaja( this.autos[car] );
        //console.log('el monto es:'+ monto+ 'la suma es: ' + suma);
    
       }
    }
    return suma
  }

  DatosCaja( auto: AutoModel ){
 
    var hoy = new Date();
    let dia_actual=hoy.getDate();
    //let hora = hoy.getHours()+':'+hoy.getMinutes();
    let hora_actual= hoy.getHours();
    let minutos_actual=hoy.getMinutes();
    let mes_actual=hoy.getMonth()+1;
    //let hora = hora_actual.toString()+":"+minutos_actual.toString();
    //console.log(hoy);

    let mes_ticket = parseInt(auto.fecha.slice(5,7),10);
    let dia_ticket = parseInt(auto.fecha.slice(8,10),10)
    let hora_ticket = parseInt(auto.hora.slice(0,2),10);
    let minutos_ticket = parseInt(auto.hora.slice(3,5),10);
    
    let mes=[31,28,31,30,31,30,31,31,30,31,30,31]
    let total_meses = mes_actual - mes_ticket;
    let total_dias = dia_actual - dia_ticket;
    let total_minutos = 1440*mes[mes_ticket-1]*(total_meses)+1440*(total_dias)+60*(hora_actual - hora_ticket)+(minutos_actual - minutos_ticket);
 
    let valor = this.configuracion[0].valor_minuto;
    let max_dia = this.configuracion[0].cobro_max_dia;
    let valor_dia = this.configuracion[0].valor_dia;
    
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
    return monto

  }
  
}