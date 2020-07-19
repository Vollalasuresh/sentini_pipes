import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html'
})
export class CreateproductComponent implements OnInit {

  url: string = 'http://localhost:9000/products/saveProduct';

  prodForm = new FormGroup({
    prod_Type: new FormControl(''),
    sno: new FormControl(''),
    item: new FormControl(''),
    size: new FormControl(''),
    sku_Code: new FormControl(''),
    sku_Desdription: new FormControl(''),
    std_Pkg: new FormControl(''),
    price: new FormControl(''),
    dealDiscount: new FormControl(''),
    disDiscount: new FormControl('')

  })

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }


  postProducts() {
    this._http.post(this.url, this.prodForm.value).subscribe((data) => {
      console.log(this.prodForm.value);
    })
  }


}
