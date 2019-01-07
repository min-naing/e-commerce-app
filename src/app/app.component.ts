import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {

    this.afAuth.auth.getRedirectResult().then(result => {
      if( result.user ) {
        this.userService.save(result.user);
      }
    });

    this.authService.user$
      .subscribe( user => {
        if( user ) {
          
          const returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      });
  }

}
