import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    firebase.auth().getRedirectResult().then(result => {
      if( result.user ) {
        this.userService.save(result.user).then( () => {
          this.router.navigateByUrl( localStorage.getItem('returnUrl') );
        });
      }
    });
  }

  login() {
    this.authService.login();
  }

}
