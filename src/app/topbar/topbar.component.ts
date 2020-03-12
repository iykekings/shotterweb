import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  link = 'login';

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        console.log('this is what your looking for ', event.url);
        this.link = event.url;
      });
  }

}
