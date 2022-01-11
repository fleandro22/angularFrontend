import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData:any = {
    "name":'',
    "employment": ''
  }
  
  constructor(public authS:AuthService, private router: Router,) { }

  async ngOnInit() {
    console.log("mi inicio-->", this.authS.userLogged)
    if(this.authS.isLogged ) {
      this.userData = this.authS.getDataUser()
    } else {
       this.router.navigate(['/login']);
    }
  }


  handleLogout(): void{
    this.router.navigate(['/login']);
    this.authS.logout();
  }

}
