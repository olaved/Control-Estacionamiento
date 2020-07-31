import { Component, OnInit } from '@angular/core';

import { AutosService } from 'src/app/services/autos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

import { RouterLink, Router } from '@angular/router';
import { observable } from 'rxjs';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  constructor(private auth: AuthService,
              private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.usuariosService.getUsuarios().subscribe( resp => this.usuarios = resp);
  }

  borrarUsuario( usuario: UsuarioModel, i:number ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea eliminar a ${ usuario.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp=> {
        if ( resp.value){
          
          this.usuarios.splice(i, 1);  //borrar del arreglo
          this.usuariosService.borrarUsuario( usuario.id ).subscribe();
          Swal.fire({
            icon:'success',
            html: `<h3>Usuario eliminado satisfactoriamente </h3></br>`,
            showConfirmButton: true,
            })
          //location.reload();
        }
    })

  }

}
