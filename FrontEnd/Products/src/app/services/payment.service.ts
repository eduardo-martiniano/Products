import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  pay(buyViewModel: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + '/buy/process', buyViewModel).subscribe(
        result => resolve(result),
        error => reject(error));
      });
  }

}
