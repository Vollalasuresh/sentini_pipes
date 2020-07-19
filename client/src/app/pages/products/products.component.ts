import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import readXlsxFile from 'read-excel-file';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { data } from 'jquery';
import { NgSwitchDefault } from '@angular/common';

@Component({
    selector: 'products-cmp',
    moduleId: module.id,
    templateUrl: 'products.component.html'
})

export class ProductsComponent {
    constructor(private _http: HttpClient, private router: Router, private modalService: NgbModal) { }
    products: any = [];
    prod: any = [];
    productInfo: any = {};
    closeResult: string;
    ngOnInit() {
        this.getProds();
    }
    getProds() {
        this._http.get("http://localhost:9000/products/").subscribe(products => {
            this.products = products;
            console.log(products);
        });
    }
    onImportChange(event) {
        console.log(event.target.files[0])
        readXlsxFile(event.target.files[0], { sheet: 1 }).then((rows) => {
            rows.shift()
            rows.shift()
            console.log("from ipmort", rows.length)

            _.each(rows, (r) => {
                console.log("row", r)
                this.prod.push({
                    sno: r[0],
                    item: r[1],
                    size: r[2],
                    sku_Code: r[3],
                    sku_Description: r[4],
                    std_Pkg: r[5],
                    price: r[6]

                })

            })
            _.each(this.prod, (p) => {
                this._http.post("http://localhost:9000/products/saveProduct/", p).subscribe(p => {
                    console.log("product saved")
                })
                console.log("poducts array", this.prod)
            })



        })
    }

    open(content, productId) {
        this._http.get("http://localhost:9000/products/productList/" + productId).subscribe(prod => {
            this.productInfo = prod[0];
            console.log("edit prod", this.productInfo);
        });
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    saveproduct() {
        // this._http.post(this.url, this.prodForm.value).subscribe((data) => {
        //     console.log(this.prodForm.value);
        // })
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    openProd() {
        this.router.navigate(['/createproduct']);
    }
}
