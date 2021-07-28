import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  authenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(value => {
      this.authenticated = value;
    })
  }

}
