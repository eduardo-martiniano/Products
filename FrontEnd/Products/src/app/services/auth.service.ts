import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5000/api";
  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { 
    this.authenticated.next(this.localStorageService.userHasThisRole('admin'));
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + '/login', {username, password}).subscribe(
        result => {
          this.authenticated.next(true),
          resolve(result)
        },
        error => reject(error));
    });
  }
}
