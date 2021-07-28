import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productsNumber = 0;
  authenticated = false;
  constructor(public localStorageService: LocalStorageService, 
              private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(value => {
      this.authenticated = value;
    });
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.authService.authenticated.next(false);
    this.route.navigate(['login']);
  }

}
