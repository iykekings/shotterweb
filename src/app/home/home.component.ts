import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }
}
