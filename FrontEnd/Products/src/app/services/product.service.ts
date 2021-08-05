import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:5000/api/products"

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  readAll(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get<Product[]>(this.baseUrl).subscribe(
        result => resolve(result),
        error => reject(error));
    });
  }

  getByName(name: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/search?name='+name)
  }

  create(product: Product): Promise<any> {
    const headers = {
      'Authorization': `Bearer ${this.localStorageService.getToken()}`
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl, product, {headers: headers}).subscribe(
        result => resolve(result),
        error => reject(error));
    });
  }

  edit(product: Product, id: any): Promise<any> {
    const headers = {
      'Authorization': `Bearer ${this.localStorageService.getToken()}`
    };
    return new Promise((resolve, reject) => {
      this.http.put<any>(this.baseUrl+'/'+id, product, {headers: headers}).subscribe(
        result => resolve(result),
        error => reject(error));
    });
  }

  remove(id: any): Promise<any> {
    const headers = {
      'Authorization': `Bearer ${this.localStorageService.getToken()}`
    };
    return new Promise((resolve, reject) => {
      this.http.delete<Product>(this.baseUrl+'/'+id, {headers: headers}).subscribe(
        result => resolve(result),
        error => reject(error));
    });
  }

}
