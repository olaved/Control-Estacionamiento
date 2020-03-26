import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from 'src/app/models/auto.model';
import Swal from 'sweetalert2';
import { HostListener } from "@angular/core";




@Component({
  selector: 'app-pagados',
  templateUrl: './pagados.component.html',
  styleUrls: ['./pagados.component.css']
})
export class PagadosComponent implements OnInit {

  autos: AutoModel[] = [];

  constructor( private autosService: AutosService ) { }

  filterPost= '';  //

  @HostListener('onkeyup') doSomething(){
    console.log('Hola ticket');
  }

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

MostrarFoto( auto: AutoModel, i:number){

  Swal.fire({
    imageUrl: auto.foto,
    imageWidth: 500,
    imageAlt: 'Foto Auto'
  })

}

}