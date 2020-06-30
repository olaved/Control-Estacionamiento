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

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConfigComponent } from './configuracion/config/config.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CodebarComponent } from './pages/codebar/codebar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';





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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
