import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(res => {
      console.log("loggedin user", res.token);
      localStorage.setItem('userid', JSON.stringify(res.token));
      var a = JSON.parse(localStorage.getItem('userid'))
      console.log('from storage', a.userId)
      this.router.navigate(['/dashboard']);
    })
  }



}
