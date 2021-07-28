import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product.model';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  formulario: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product},
              private productService: ProductService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: [this.data.product.name, [Validators.required, Validators.maxLength(20)]],
      price: [this.data.product.price, [Validators.required]],
      image: [this.data.product.image, [Validators.required]]
    })
  }

  edit(): void {
    this.spinner.show();
    const product = this.formulario.value as Product;
    this.productService.edit(product, this.data.product.id).then(() =>{
      this.spinner.hide();
      this.messageService.showSucess("Produto Editado com sucesso!");
    });
  }

  remove(): void {
    this.productService.remove(this.data.product.id).then(
      () => this.messageService.showSucess("Produto excluido com sucesso!"));
  }

  get isValid(): boolean{
    return this.formulario.valid
  }

}
