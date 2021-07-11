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
    let total = 0;
    let list = this.getProductListInCart();
    if (list.length > 0) {
      total = list.map(x => x.price).reduce((total, currentElement) => total + currentElement, 0);
    }
    return total;

  }

  removeProduct(product_id: number) {
    let productsListInCart = this.getProductListInCart().filter(x => x.id != product_id);
    localStorage.setItem("products", JSON.stringify(productsListInCart));
    this.productsNumber--;
  }

}
