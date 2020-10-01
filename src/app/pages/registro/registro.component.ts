import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //usuario: UsuarioModel;
  recordarme: false;
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService,
               private router: Router,
               private route: ActivatedRoute,
               private usuarios: UsuariosService) { }

  ngOnInit() {

 //   this.usuario = new UsuarioModel();

  
  }

  guardar( form: NgForm) {

    if (form.invalid){return;}
   
    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor...',
      timer: 3000
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
        .subscribe( resp =>{
            console.log(resp);

            if( this.recordarme){
                localStorage.setItem('email', this.usuario.email);
            }

            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              title: 'Su cuenta se a creado exitosamente',
              showConfirmButton: true
            });

            this.usuarios.crearUsuarioBD( this.usuario).subscribe(); 
            this.router.navigateByUrl('/registro');  

        }, (err) => {
          //console.log(err.error.error.message);        
          
          Swal.fire({
            icon: 'error',
            title: 'Error autentificacion',
            text: err.error.error.message,
            allowOutsideClick: false,
          });

        });

  }

}
