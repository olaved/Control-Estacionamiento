import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  autos: AutoModel[] = [];
  
  
  constructor( private autosService: AutosService ) { }

  ngOnInit() {
  
  this.autosService.getAutos().subscribe( resp => this.autos = resp);

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

}