import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { utilsBr, fakerBr } from 'js-brasil';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-try-pay-again',
  templateUrl: './try-pay-again.component.html',
  styleUrls: ['./try-pay-again.component.css']
})
export class TryPayAgainComponent implements OnInit {

  formPayment: any;
  public MASKS = utilsBr.MASKS;
  show_button_try_again = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private paymentService: PaymentService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              public dialogRef: MatDialogRef<TryPayAgainComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formPayment = this.fb.group({
      number: ['', Validators.required],
      name: ['', Validators.required],
      cvv: ['', Validators.required],
      dateValidate: ['', Validators.required],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  payAgain() {
    this.spinner.show();
    const cardPayload = this.formPayment.value;
    this.paymentService.tryPayAgain(this.data, cardPayload).then(response => {
      if (response.payd) {
        this.localStorageService.clearLocalStorage();
        this.spinner.hide();
        this.dialogRef.close();
        this.messageService.showSucess("Pagamento realizado com sucesso!");
        this.router.navigate(['home']);
      }
      else {
        this.show_button_try_again = true
        this.spinner.hide();
        this.messageService.showError("Não foi possivel realizar o pagamento, tente novamente");
      }
    });
  }

  get formValid(): boolean {
    return this.formPayment.valid;
  }

}
