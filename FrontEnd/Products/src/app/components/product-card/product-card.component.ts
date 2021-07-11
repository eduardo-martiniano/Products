import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  addToCart() {
    if (!this.localStorageService.productInList(this.product.id || 0)) {
      this.localStorageService.addToCart(this.product);
    }
  }

}
