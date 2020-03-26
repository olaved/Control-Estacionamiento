import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

import { AutosComponent } from './pages/autos/autos.component';
import { AutoComponent } from './pages/auto/auto.component';
import { PagadosComponent } from './pages/pagados/pagados.component';
import { CodebarComponent } from './pages/codebar/codebar.component'

const routes: Routes = [
    { path: 'autos', component: AutosComponent },
    { path: 'auto/:id', component: AutoComponent },
    { path: 'pagados', component: PagadosComponent},
    { path: 'codebar', component: CodebarComponent},
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
