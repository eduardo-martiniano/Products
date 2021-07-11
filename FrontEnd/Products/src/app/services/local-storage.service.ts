import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  productsNumber = 0;

  constructor() {
    let productsListInCart = this.getProductListInCart();
    this.productsNumber = productsListInCart.length
  }

  addToCart(product: Product) {
    let productsListInCart = this.getProductListInCart();
    productsListInCart.push(product);
    localStorage.setItem("products", JSON.stringify(productsListInCart));
    this.productsNumber = productsListInCart.length;
  }

  getProductListInCart(): Product[] {
    return JSON.parse(localStorage.getItem("products") as string) || [];
  }

}
