import { ɵBrowserPlatformLocation } from '@angular/platform-browser';

export class AutoModel{

    id:string;
    patente:string;
    fecha:string;
    activo:boolean;
    hora: string;
    codigo: string;
    monto: number;
    minutos: number;
    fecha_salida: Date;
    hora_salida: number;
    foto:string;
    pagado: boolean;



    constructor(){
        this.activo = true;
    }

}