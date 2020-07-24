import { ɵBrowserPlatformLocation } from '@angular/platform-browser';

export class ClienteModel{

    id:string;
    nombre:string;
    apellido_paterno:string;
    apellido_materno:string;
    run: string;
    fecha_nacimiento: string;
    cobro_mensual: number;
    telefono: number;
    email: string;
    patente_auto: string;

    constructor(){
    }

}