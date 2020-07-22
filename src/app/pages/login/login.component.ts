import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { time } from 'console';
import { setTimeout } from 'timers';
import { promise } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = true;

  constructor( private auth:AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email')){
        this.usuario.email = localStorage.getItem('email');
        this.recordarme = true;
    }
  }


  login( form: NgForm){

    if (form.invalid){return;}
    //console.log('Formulario valido')
    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      text: 'Espere por favor...',
      timer: 3000,
    });
    Swal.showLoading();
    this.auth.login( this.usuario)
      .subscribe( resp => {
        console.log(resp);
        //if (this.recordarme){
        //  localStorage.setItem('email', this.usuario.email);  
        //}
        localStorage.setItem('email', this.usuario.email);  
        this.guardarEmail();
        this.router.navigateByUrl('/autos');  
        

      }, (err) =>{
       
         //console.log(err.error.error.message);
         Swal.fire({
          icon: 'error',
          title: 'Error autentificacion',
          text: err.error.error.message,
          allowOutsideClick: false,
        });
        
      })
  }

  guardarEmail(){

     //console.log(localStorage.getItem('email'));
     return localStorage.getItem('email'); 
  }

}
