import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  appUser: AppUser;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit() {
    this.authService.appUser$.subscribe( appUser => this.appUser = appUser );
  }

  logout() {
    this.authService.logout();
  }

}
