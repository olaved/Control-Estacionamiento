import { Component, OnInit } from '@angular/core';
import { AutoModel } from 'src/app/models/auto.model';
import { NgForm } from '@angular/forms';
import { AutosService } from 'src/app/services/autos.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})


export class AutoComponent implements OnInit {


  today: number = Date.now();
  
  auto: AutoModel = new AutoModel();

  constructor( private autosService: AutosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  

    const id = this.route.snapshot.paramMap.get('id');  //a las rutas

    if ( id !== 'kldool'){

        this.autosService.getAuto(id).subscribe( (resp: AutoModel) => {   //llamar al servicio
        this.auto = resp;
        this.auto.id = id;
        });
    }
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

      if (this.auto.id){
        peticion = this.autosService.actualizarAuto(this.auto);

        peticion.subscribe(resp=>{

          Swal.fire({
            title: this.auto.patente.toUpperCase(),
            text: 'Se actualizo correctamente',
            icon: 'success'
          });
        });

        
      }else{
        peticion = this.autosService.crearAuto(this.auto);

        peticion.subscribe(resp=>{

          Swal.fire({
            title: this.auto.patente.toUpperCase(),
            text: 'Se a creado correctamente',
            icon: 'success'
          });
        });
      }
      

  
}
}