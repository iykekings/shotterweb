import { Injectable } from '@angular/core';
import { Alert } from 'src/interfaces/Alert';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    alerts = new Subject<Alert>();
    constructor() {}

    addAlert(newAlert: Alert) {
        this.alerts.next(newAlert);
    }
}
