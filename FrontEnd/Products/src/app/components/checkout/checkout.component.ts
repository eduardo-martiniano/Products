import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  priceTotal = 0;
  form: any;

  constructor(private router: Router, private fb: FormBuilder, private localStorageService: LocalStorageService) {
    this.priceTotal = this.localStorageService.getTotalOfBuy();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      number: ['', Validators.required],
      name: ['', Validators.required],
      cvv: ['', Validators.required],
      dateValidate: ['', Validators.required],
    });
  }

}
