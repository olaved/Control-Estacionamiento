import { Component, OnInit } from '@angular/core';
import { ConfiguracionModel } from 'src/app/models/configuracion.model';
import { ConfigService } from 'src/app/services/config.service';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { config } from 'process';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configuracion: ConfiguracionModel = new ConfiguracionModel();

  constructor( private configService: ConfigService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');  //a las rutas

    if ( id !== 'kldool'){

        this.configService.getConfig(id).subscribe( (resp: ConfiguracionModel) => {   //llamar al servicio
        this.configuracion = resp;
        this.configuracion.id = id;
        });
    }
  }

  public obtenerValor(configuracion: ConfiguracionModel, i: string ){

    console.log(configuracion.valor_minuto);
    return configuracion.valor_minuto;
  }

  guardar(form: NgForm){

    if (form.invalid){
      console.log('Formulario no valido');
      return;
      }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',    
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

      if (this.configuracion.id){
        peticion = this.configService.actualizarConfig(this.configuracion);

        peticion.subscribe(resp=>{

          Swal.fire({
            
            text: 'Se actualizo correctamente',
            icon: 'success'
          });
        });

        
      }else{
        peticion = this.configService.crearConfig(this.configuracion);

        peticion.subscribe(resp=>{

          Swal.fire({
            text: 'Se a creado correctamente',
            icon: 'success'
          });
        });
      }
      

  
}

}
