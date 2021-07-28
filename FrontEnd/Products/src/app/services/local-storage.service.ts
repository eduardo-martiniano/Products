import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  productsNumber = 0;

  constructor(private jwt: JwtHelperService) {
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

  clearLocalStorage() {
    localStorage.removeItem('total');
    localStorage.removeItem('products');
    localStorage.removeItem('token');
    this.productsNumber = 0;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  userAuthenticated(): boolean {
    const tokenDecoded = this.jwt.decodeToken(localStorage.getItem('token') as string);
    console.log(tokenDecoded);
    return localStorage.getItem('token') != null;
  }

  userHasThisRole(role: string): boolean {
    const decodedToken = this.jwt.decodeToken(localStorage.getItem('token') as string);
    return decodedToken?.role == role;
  }

}
