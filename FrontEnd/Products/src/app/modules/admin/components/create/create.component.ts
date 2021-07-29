import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product.model';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formulario: any;

  constructor(private productService : ProductService,
              private messageSevice: MessageService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  create(): void {
    this.spinner.show();
    const product = this.formulario.value as Product
    this.productService.create(product).then(() =>{
      this.messageSevice.showSucess("Produto criado com sucesso!");
      this.formulario.reset();
      this.spinner.hide();
    }).catch(error => {
      this.messageSevice.showErrorByStatus(error.status);
      if (error.status == 401) {
        this.router.navigate(['login']);
      }
    });
  }

  get isValid(): boolean{
    return this.formulario.valid
  }

}
