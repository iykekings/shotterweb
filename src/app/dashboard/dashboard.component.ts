import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        const helper = new JwtHelperService();
        console.log(helper.decodeToken(localStorage.getItem('token')));
    }
}
