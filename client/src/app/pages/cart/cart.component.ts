import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _http: HttpClient) { }
  otpForm = new FormGroup({
    token: new FormControl(''),
  })
  ngOnInit(): void {
  }

  validateOTP() {

  }
  placeOrder() {
    //this._http.get('/placeOrder').
  }
}
