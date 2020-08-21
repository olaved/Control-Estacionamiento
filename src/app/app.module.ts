import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AutoComponent } from './pages/auto/auto.component';
import { AutosComponent } from './pages/autos/autos.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagadosComponent } from './pages/pagados/pagados.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxPaginationModule} from 'ngx-pagination';

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConfigComponent } from './pages/config/config.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CodebarComponent } from './pages/codebar/codebar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { InicioComponent } from './pages/inicio/inicio.component';





@NgModule({
  declarations: [
    AppComponent,
    AutoComponent,
    AutosComponent,
    PagadosComponent,
    NavbarComponent,
    ConfigComponent,
    FilterPipe,
    CodebarComponent,
    LoginComponent,
    RegistroComponent,
    ReportesComponent,
    ClientesComponent,
    ClienteComponent,
    UsuariosComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
