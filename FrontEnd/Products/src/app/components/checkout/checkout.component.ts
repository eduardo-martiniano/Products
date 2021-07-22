import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { utilsBr, fakerBr } from 'js-brasil';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  priceTotal = 0;
  formAddress: any;
  formPayment: any;
  public MASKS = utilsBr.MASKS;

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private paymentService: PaymentService,
              private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.formAddress = this.fb.group({
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      complement: ['']
    });

    this.formPayment = this.fb.group({
      number: ['', Validators.required],
      name: ['', Validators.required],
      cvv: ['', Validators.required],
      dateValidate: ['', Validators.required],
    });

    this.priceTotal = this.localStorageService.getTotalOfBuy();
  }

  get formAddressValid(): boolean {
    return this.formAddress.valid;
  }

  get formPaymentValid(): boolean {
    return this.formPayment .valid;
  }

  pay() {
    const address = this.formAddress.value;
    const card = this.formPayment.value;
    const products = this.localStorageService.getProductListInCart();
    const buy = {
      products: products,
      address: address
    };

    const buyViweModel = {
      buy: buy,
      card: card
    };

    this.paymentService.pay(buyViweModel).then(response => {
      console.log(response);
    })

  }

}

