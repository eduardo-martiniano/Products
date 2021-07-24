import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:5000/api/products"

  constructor(private http: HttpClient) { }

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

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  edit(product: Product, id?: number): Observable<Product> {
    return this.http.put<Product>(this.baseUrl+'/'+id, product)
  }

  remove(id?: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl+'/'+id)
  }

}
