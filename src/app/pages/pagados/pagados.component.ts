import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';
import { HostListener } from "@angular/core";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';




@Component({
  selector: 'app-pagados',
  templateUrl: './pagados.component.html',
  styleUrls: ['./pagados.component.css']
})
export class PagadosComponent implements OnInit {

  autos: AutoModel[] = [];
  usuarios: UsuarioModel[] = [];

  p: number = 1;

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

}

elUsuario(correo: String){
  for (let user in this.usuarios){  
    //console.log(this.usuarios[user].email);
    //console.log(correo);
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