import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url = "http://localhost:9000/user/login"
  private register_url = "http://localhost:9000/user/saveUser"
  private redirectUrl = "http://localhost:4200/#/dashboard"

  constructor(private _http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this._http.post<any>(this.login_url, user);
    localStorage.setItem('userId', JSON.stringify(user));
  }

  logout() {

  }
  isUserLoggedin() {
    return true;
  }


  registerUser(user) {
    return this._http.post<any>(this.register_url, user)
  }

}
