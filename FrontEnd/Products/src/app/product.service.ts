import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:5000/api/products"

  constructor(private http: HttpClient) { }

  readAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }
}
