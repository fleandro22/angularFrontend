import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('')
  });

  messageError = '';
  screenSize: number = 0;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.screenSize = window.screen.width;
  }

  handleLogin() {
    const { username } =  this.loginForm.value;

    const userData:any = {
      "usuario": username
    }
    
    try {
      this.authService.login(userData).subscribe((res) => {
      if(res?.statusResponse === 'SUCCESS') {
          this.router.navigate(['/home']);
          this.messageError = '';
      } else {

        this.messageError = res?.message;
      }

      this.loginForm.setValue({
        username: ""
      });

      },error => {

          this.messageError = error;
      })


    } catch(error) { error}
  }

}
