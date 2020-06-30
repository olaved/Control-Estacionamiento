import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private auth: AuthService,
               private router:Router  ) { }
  ngOnInit() {
  }

  buscarTicket( termino: string){
    console.log(termino);
    this.router.navigate( ['/buscar', termino] );
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
