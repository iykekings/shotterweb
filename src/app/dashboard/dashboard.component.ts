import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import Url from 'src/interfaces/Url';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    urls: Url[];

    constructor(private urlService: UrlService) {}

    ngOnInit(): void {
        this.fetchAllUrls();
    }

    fetchAllUrls() {
        this.urlService.fetchAllUrlByUser().subscribe(data => {
            this.urls = data;
            console.log(data);
        });
    }
}
