import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url ='https://identitytoolkit.googleapis.com/v1/accounts:';
    private urlBD='https://raspberry-bf5f5.firebaseio.com';
    private apikey = 'AIzaSyDEPVqRpAIVt6EsKX4Exono3yKenE2gIOE';

    userToken: String;
    email: String;

  //crear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //logear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient ) { 
    this.leerToken();
    console.log('el correo leido');
    this.leerCorreo();
  }

  logout(){
    localStorage.removeItem('token');
    location.reload();
  }

  login( usuario: UsuarioModel){

    const authData ={
      ...usuario,
      //email: usuario.email,
      //password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
          ).pipe(
            map( resp => {
              //console.log('Entro en el map')
              this.guardarToken( resp['idToken']);
              console.log('la respuesta');
              console.log(resp);
              return resp;
            })
          );

  }

  nuevoUsuario( usuario: UsuarioModel){

    const authData ={
      ...usuario,
      //email: usuario.email,
      //password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
          ).pipe(
            map( resp => {
              //console.log('Entro en el map')
              this.guardarToken( resp['idToken']);
              return resp;
            })
          );

  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }


  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  leerCorreo() {

    if ( localStorage.getItem('email') ) {
      this.email = localStorage.getItem('email');
    } else {
      this.email = '';
    }
    console.log(this.email);
    return this.email;
  }

    estaAutenticado(): boolean {

      if ( this.userToken.length < 2 ) {
        return false;
      }
  
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
  
      if ( expiraDate > new Date() ) {
        return true;
      } else {
        return false;
      }
    }

}
