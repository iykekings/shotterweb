import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import Url from 'src/interfaces/Url';
import { environment } from '../../environments/environment';
import { AlertService } from '../alert.service';
import { Alert } from 'src/interfaces/Alert';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input() url: Url;
    baseUrl = environment.baseUrl;
    constructor(private al: AlertService) {}

    hostname(link: string) {
        return new URL(link).hostname.match(/\w+.\w+$/)[0];
    }

    renderDate(date: string) {
        return date.split('T').length > 1 ? date.split('T')[0] : 'No Date';
    }
    addAlert() {
        this.al.addAlert(new Alert('Copied to clipboard', 'info'));
    }
}
