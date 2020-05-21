import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router  ) { }
  ngOnInit() {
  }

  buscarTicket( termino: string){
    console.log(termino);
    this.router.navigate( ['/buscar', termino] );
  }

}
