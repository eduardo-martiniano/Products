import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/product.model';
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
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  create(): void {
    const product = this.formulario.value as Product
    this.productService.create(product).subscribe(x =>{
      this.messageSevice.showSucess("Produto Criado com sucesso!");
      this.formulario.reset();
    })
  }

  get isValid(): boolean{
    return this.formulario.valid
  }

}
