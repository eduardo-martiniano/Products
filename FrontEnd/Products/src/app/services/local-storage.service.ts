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

  productInList(productId: number): boolean {
    const list = this.getProductListInCart();
    return list.filter(x => x.id == productId).length > 0;
  }

  createTotalOfBuy(total: number) {
    localStorage.setItem('total', total.toString())
  }

  getTotalOfBuy(): number {
    return Number.parseFloat(localStorage.getItem('total') || "0");
  }

}
