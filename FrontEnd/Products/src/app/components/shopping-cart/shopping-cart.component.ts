import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products!: Product[];
  total = 0;

  constructor(private localStorageService: LocalStorageService, private route: Router) { }

  ngOnInit(): void {
    this.products = this.localStorageService.getProductListInCart();
    this.total = this.products.map(x => x.price).reduce((total, currentElement) => total + currentElement);
  }

  pay() {
    this.localStorageService.createTotalOfBuy(this.total);
    this.route.navigate(['checkout']);
  }

}
