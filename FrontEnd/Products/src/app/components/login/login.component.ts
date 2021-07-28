import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;

  constructor(private fb: FormBuilder,
              private localStorageService: LocalStorageService,
              private route: Router,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.spinner.show();
    const credentials = this.form.value;
    this.authService.login(credentials.username, credentials.password).then(response => {
      this.localStorageService.saveToken(response.token);
      this.spinner.hide();
      this.route.navigate(['products/create']);
    }).catch(() => {
      this.messageService.showError("Credencias invalidas!"),
      this.spinner.hide();
    });
  }

}
