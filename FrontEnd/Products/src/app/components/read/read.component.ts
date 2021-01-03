import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  products!: Product[]
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.readAll().subscribe(products =>{
      this.products = products
      console.log(products)
    })
  }
}
