import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

import { AutosComponent } from './pages/autos/autos.component';
import { AutoComponent } from './pages/auto/auto.component';
import { PagadosComponent } from './pages/pagados/pagados.component';
import { CodebarComponent } from './pages/codebar/codebar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ConfigComponent } from './pages/config/config.component';
import { AuthGuard } from './guard/auth.guard';

import { ReportesComponent } from './pages/reportes/reportes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const routes: Routes = [
    { path: 'autos', component: AutosComponent, canActivate: [AuthGuard] },
    { path: 'auto/:id', component: AutoComponent, canActivate: [AuthGuard]  },
    { path: 'pagados', component: PagadosComponent, canActivate: [AuthGuard]  },
    { path: 'configuracion/:id', component: ConfigComponent, canActivate: [AuthGuard]  },
    { path: 'codebar', component: CodebarComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
    { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard]},
    { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
    { path: 'cliente/:id', component: ClienteComponent, canActivate: [AuthGuard]},
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    { path: '**', pathMatch: 'full', redirectTo: 'autos' }
];



@NgModule({

    imports: [
    RouterModule.forRoot( routes )
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
