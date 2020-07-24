import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { stringify } from 'querystring';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  constructor(private _http: HttpClient) { }
  otpForm = new FormGroup({
    token: new FormControl(''),
  })
  ngOnInit(): void {
    this.getCartProds()

  }

  totalItems: any = 0;
  getCartProds() {
    var a = JSON.parse(localStorage.getItem('userid'))
    var user_Id = a.userId;
    this._http.get('http://localhost:9000/cart/getCart/' + user_Id + '').subscribe(cartItems => {
      this.cartItems = cartItems[0].products;
      //console.log("User cart", cartItems[0].products)
      //console.log("Cart Items", this.cartItems)
      this.getTotal(this.cartItems)
      this.totalItems = this.cartItems.length;
    })
  }


  total: any = 0;
  getTotal(cart) {
    //console.log(" from total", this.cartItems)
    _.each(cart, (p) => {
      this.total = this.total + (p.quantity * p.price)
      // console.log("total", this.total)

    })
    //console.log("total", this.total)
    this.total = this.total + (this.total * 0.18);
    return parseFloat(this.total).toFixed(2)


  }


  validateOTP() {

  }
  cc: any = {}
  placeOrder() {
    // console.log("placing", this.cartItems)
    this.cc = this.cartItems
    this.cc.total = this.total
    console.log("placing order", this.cc.total)
    this._http.post('http://localhost:9000/cart/placeOrder', this.cc).subscribe(res => {
      console.log('from cart');
    });
  }

}

