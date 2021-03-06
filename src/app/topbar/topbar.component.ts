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
    theme: {
        dark: { [key: string]: string };
        light: { [key: string]: string };
    } = {
        dark: {
            '--body-bg': '#333333',
            '--black': '#2a2a2a',
            '--white': '#ffffff',
            '--trans-bg': '#ffffff27',
            '--font-black': '#2a2a2a',
            '--font-grey': '#636363',
            '--font-white': '#eeeeee',
            '--yellow': '#f9a826',
            '--btn-bg': '#f9a826',
            '--btn-font': '#2a2a2a',
        },
        light: {
            '--body-bg': '#F9F9F9',
            '--black': '#ffffff',
            '--white': '#2a2a2a',
            '--trans-bg': '#00000027',
            '--font-black': '#eeeeee',
            '--font-grey': '#636363',
            '--font-white': '#2a2a2a',
            '--yellow': '#6C63FF',
            '--btn-bg': '#6C63FF',
            '--btn-font': '#ffffff',
        },
    };

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.initTheme();
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe(event => {
                this.link = event.url;
            });
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                if (e.matches) {
                    this.changeTheme('light');
                } else {
                    this.changeTheme('dark');
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    initTheme() {
        const currentState = localStorage.getItem('theme');
        if (currentState) {
            for (const [key, value] of Object.entries(
                this.theme[currentState]
            )) {
                document.documentElement.style.setProperty(
                    key,
                    value as string
                );
            }
        }
    }
    changeTheme(state?: string) {
        const currentState = state || localStorage.getItem('theme');
        const newState = !currentState
            ? 'light'
            : currentState === 'dark'
            ? 'light'
            : 'dark';
        for (const [key, value] of Object.entries(this.theme[newState])) {
            document.documentElement.style.setProperty(key, value);
        }
        localStorage.setItem('theme', newState);
    }
}
