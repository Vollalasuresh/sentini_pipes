import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerUserData = {}
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }
  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(res => console.log(res))
  }



}
