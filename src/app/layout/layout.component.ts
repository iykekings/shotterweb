import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { Alert } from 'src/interfaces/Alert';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private al: AlertService) {}

    ngOnInit(): void {
        this.al.alerts.subscribe(data => {
            this.alerts = [...this.alerts, data];
        });
    }

    deleteAlert(id: string) {
        this.alerts = this.alerts.filter(alert => alert.id !== id);
    }
}
