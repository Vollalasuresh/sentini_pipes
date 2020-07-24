import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    constructor(private _http: HttpClient, private router: Router) { }
    users: any = [];
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this._http.get("http://localhost:9000/user/").subscribe(users => {
            this.users = users;
            console.log(users);
        });
    }
}
