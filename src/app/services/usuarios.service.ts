import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, delay } from 'rxjs/operators';

import { ConfigService } from 'src/app/services/config.service';
import { ConfiguracionModel } from 'src/app/models/configuracion.model';
import { UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url='https://raspberry-bf5f5.firebaseio.com';
  autos: any;
  private urlAuth ='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDEPVqRpAIVt6EsKX4Exono3yKenE2gIOE';


  constructor( private http: HttpClient) { }

  crearUsuarioBD( usuario: UsuarioModel){
    console.log(usuario);
    console.log(usuario.id);
    delete usuario.password;
    return this.http.post(`${this.url}/registro.json`, usuario ).pipe(
      map( (resp:any) =>{
        usuario.id= resp.name;
        console.log(usuario);
        return usuario;
      })
    );
  }


  getUsuario(id: string){

    return this.http.get(`${this.url}/registro/${id}.json`);
  }

  getUsuarios(){
    return this.http.get(`${this.url}/registro.json`).pipe(
      map( resp => this.crearArreglo(resp)));
  }

  private crearArreglo( usuariosObj: object){
    
    const usuarios: UsuarioModel[] = [];
    console.log( usuariosObj);
    Object.keys( usuariosObj ).forEach( key =>{
      const usuario: UsuarioModel = usuariosObj[key];
      usuario.id = key;
      usuarios.push(usuario);
    });
 
    return usuarios;
  }

  borrarUsuario( id:string ){

    return this.http.delete(`${this.urlAuth}delete?key=${this.apikey}/uid=AawgqrBwOKMyUL1gqsedFEmLT7Q2` );
    //return this.http.delete(`${this.urlAuth}signUp?key=${this.apikey}/json,AawgqrBwOKMyUL1gqsedFEmLT7Q2`);
   // return this.http.delete(`${ this.url }/registro/${ id }.json`);

   }


}
