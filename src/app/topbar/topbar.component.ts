import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
    link = 'login';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe(event => {
                this.link = event.url;
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
