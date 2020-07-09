import { Component, OnInit, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfiguracionModel } from 'src/app/models/configuracion.model'
import { ConfigService } from 'src/app/services/config.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  

  constructor( private auth: AuthService,
               private router:Router,
               private usuariosService: UsuariosService  ) { }

  ngOnInit() {
    
   // let correo = this.auth.leerCorreo();
   // console.log('el correo'+': '+correo);
    this.usuariosService.getUsuarios().subscribe( resp => this.usuarios = resp)
    /*
    this.usuariosService.getUsuarios().subscribe( resp => {this.usuarios = resp
      for (let user in this.usuarios){  
        console.log(this.usuarios[user].email);
        console.log(correo);
        if (correo==this.usuarios[user].email){
          console.log('encontro el correo:' + correo);
          let rol = this.usuarios[user].rol;
          console.log(rol);
        }
      }
    }); */
   // let user = this.elUsuario(localStorage.getItem('email'));
    

  }


  elUsuario(correo: String){
      for (let user in this.usuarios){  
        console.log(this.usuarios[user].email);
        console.log(correo);
        if (correo==this.usuarios[user].email){
          console.log('encontro el correo:' + correo);
          let rol = this.usuarios[user].rol;
          console.log(rol);
          return rol     
          }
        } 
  }

  buscarTicket( termino: string){
    console.log(termino);
    this.router.navigate( ['/buscar', termino] );
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


}
