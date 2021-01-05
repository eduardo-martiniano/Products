import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  formulario: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, private productService: ProductService) {
    this.formulario = new FormGroup({
      name: new FormControl(data.product.name, [Validators.required, Validators.maxLength(20)]),
      price: new FormControl(data.product.price, [Validators.required]),
      image: new FormControl(data.product.image, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  edit(): void {
    const product = this.formulario.value as Product
    this.productService.edit(product, this.data.product.id).subscribe(x =>{
    })
  }

  get isValid(): boolean{
    return this.formulario.valid
  }

}
