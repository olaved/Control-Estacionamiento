import { ɵBrowserPlatformLocation } from '@angular/platform-browser';

export class AutoModel{

    id:string;
    patente:string;
    fecha:string;
    activo:boolean;
    hora: string;


    constructor(){
        this.activo = true;
    }

}