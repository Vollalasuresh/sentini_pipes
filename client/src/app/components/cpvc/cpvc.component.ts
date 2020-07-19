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
    // this.productsForm = this.fb.group({ 'productsList': this.fb.array([]) });
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

    console.log("Addto csrd",)
    const selectedProduct = {
      sNo: product.sNo,
      quantity: (<FormArray>this.productsForm.get('productsList')).controls[index].get('quantity').value,
      sku_Code: product.sku_Code
    };
    this._http.post("http://localhost:9000/cart/addToCart", selectedProduct).subscribe(res => {
      this.productAdded.emit(product);
    });
    console.log(product)
  }




}
