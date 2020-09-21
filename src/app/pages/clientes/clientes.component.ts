import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClienteModel } from 'src/app/models/cliente.model';
import Swal from 'sweetalert2';
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
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteModel[] = [];
  configuracion: ConfiguracionModel[] = [];
  usuarios: UsuarioModel[] = [];

  p: number = 1;

  constructor( private clientesService: ClientesService,
               private configService: ConfigService,
               private auth: AuthService,
              private usuariosService: UsuariosService ) { }

  filterPost= '';  //
  ngOnInit() {
  //llamar a todo el arreglo de config, y despues llamar en la posicion let valor = this.configuracion[0].valor_minuto;
  this.configService.getConfigs().subscribe( resp => this.configuracion = resp);
  this.clientesService.getClientes().subscribe( resp => this.clientes = resp);
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


  borrarCliente( cliente: ClienteModel, i:number ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea eliminar a ${ cliente.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp=> {
        if ( resp.value){
          
          this.clientes.splice(i, 1);  //borrar del arreglo
          this.clientesService.borrarCliente( cliente.id ).subscribe();
          
          Swal.fire({
            icon:'success',
            html: `<h3>Cliente eliminado satisfactoriamente </h3></br>`,
            showConfirmButton: true,
            })
        }
    })
  }

}
