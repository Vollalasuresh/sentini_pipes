import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cpvc',
  templateUrl: './cpvc.component.html',
  styleUrls: ['./cpvc.component.css']
})
export class CpvcComponent implements OnInit {
  productsForm = this.fb.group({ 'productsList': this.fb.array([]) });
  selectedProducts = [];
  constructor(private _http: HttpClient, private router: Router, private fb: FormBuilder) { }
  @Output() products: any = [];
  @Output() productAdded = new EventEmitter();
  ngOnInit() {
    this.getProds();
  }
  getProds() {
    this._http.get("http://localhost:9000/products/").subscribe(products => {
      this.products = products;
      this.products.forEach(prod => {
        (<FormArray>this.productsForm.get('productsList')).push(this.fb.group({ quantity: '' }))
      });
      console.log(products);
    });
  }


  addProductToCart(product, index) {
    var a = JSON.parse(localStorage.getItem('userid'))
    console.log("Addto cart", a.userId)
    const selectedProduct = {
      item: {
        sNo: product.sNo,
        item: product.item,
        quantity: (<FormArray>this.productsForm.get('productsList')).controls[index].get('quantity').value,
        price: product.price,
        size: product.size
      },
      user_Id: a.userId
    };
    this._http.post("http://localhost:9000/cart/addToCart", selectedProduct).subscribe(res => {
      this.productAdded.emit(product);
    });
    console.log(selectedProduct)
  }
}
