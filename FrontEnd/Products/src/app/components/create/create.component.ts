import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formulario: FormGroup

  constructor(private productService : ProductService, private snackBar: MatSnackBar) {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  create(): void {
    const product = this.formulario.value as Product
    this.productService.create(product).subscribe(x =>{
      this.snackBar.open("Produto Criado com sucesso!", "Fechar", {
        duration: 5000
      })
      this.formulario.reset()
    })
  }

  get isValid(): boolean{
    return this.formulario.valid
  }

}
