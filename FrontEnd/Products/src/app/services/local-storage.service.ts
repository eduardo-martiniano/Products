import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  productsNumber = 0;

  constructor() {
    let productsListInCart = JSON.parse(localStorage.getItem("products") as string) || [];
    this.productsNumber = productsListInCart.length
  }

  addToCart(product: Product) {
    let productsListInCart = JSON.parse(localStorage.getItem("products") as string) || [];
    productsListInCart.push(product);
    localStorage.setItem("products", JSON.stringify(productsListInCart));
    this.productsNumber = productsListInCart.length;
  }

}
