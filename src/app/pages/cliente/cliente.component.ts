import { Component, OnInit } from '@angular/core';

import { AutoModel } from 'src/app/models/auto.model';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from 'src/app/models/cliente.model';
import { truncate } from 'fs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  today: number = Date.now();
  
  cliente: ClienteModel = new ClienteModel();

  constructor( private clientesService: ClientesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  

    const id = this.route.snapshot.paramMap.get('id');  //a las rutas

    if ( id !== 'kldool'){

        this.clientesService.getCliente(id).subscribe( (resp: ClienteModel) => {   //llamar al servicio
        this.cliente = resp;
        this.cliente.id = id;
        });
    }
  }

  verificarRUN(run: String){

    //console.log(run);
    function reverseString(str) {
        return str.split('').reverse().join('');
    }
    let run_invertido = reverseString('000'+run);
    let suma_run = (parseInt(run_invertido[1],10))*2 + (parseInt(run_invertido[2],10))*3 + (parseInt(run_invertido[3],10))*4 + (parseInt(run_invertido[4],10))*5 + (parseInt(run_invertido[5],10))*6 + (parseInt(run_invertido[6],10))*7 + (parseInt(run_invertido[7],10))*2 + (parseInt(run_invertido[8],10))*3;
    
    //console.log('digito'+parseInt(run_invertido[1],10));
    //console.log('primer digito'+(parseInt(run_invertido[1],10))*2);
    //console.log(run_invertido);
    //console.log('la suma'+suma_run);

    let sum_run2 = Math.trunc(suma_run/11);
    //console.log(sum_run2);
    let sum_run3 = 11 * sum_run2;
    //console.log('14*11: '+sum_run3);
    let digito_rux = Math.trunc(suma_run - sum_run3);
    let digito_run = 11- digito_rux;
    //console.log(digito_run);

    let digito_run2 = digito_run.toString();
    if (digito_run2=='11'){
      digito_run2='0';
    } 
    //console.log(digito_run2);
    if (digito_run2=='10'){
      digito_run2='k';
    }
    if (run_invertido[0]==digito_run2){
      console.log('run valido');
      return true      
    }
    if (run_invertido[0]!=digito_run2){
      console.log('run no valido');
      return false      
    }

  }


  guardar(form: NgForm){

    if (this.verificarRUN(this.cliente.run)==false){
      Swal.fire({
        icon: 'error',
        title: 'Run no valido'
      })
        return;
    }

    if (form.invalid){
      console.log('Formulario no valido');
      Swal.fire({
        icon: 'error',
        title: 'Formulario no valido'
      })
      return;
    }

   
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',    
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

      if (this.cliente.id){
        peticion = this.clientesService.actualizarCliente(this.cliente);

        peticion.subscribe(resp=>{

          Swal.fire({
            title: this.cliente.nombre.toUpperCase(),
            text: 'Se actualizo correctamente',
            icon: 'success'
          });
        });

        
      }else{
        peticion = this.clientesService.crearCliente(this.cliente);

        peticion.subscribe(resp=>{

          Swal.fire({
            title: this.cliente.nombre.toUpperCase(),
            text: 'Se a creado correctamente',
            icon: 'success'
          });
        });
      }   
  
}
}
