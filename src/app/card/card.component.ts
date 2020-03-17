import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import Url from 'src/interfaces/Url';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input() url: Url;
    baseUrl = environment.baseUrl;
    constructor() {}

    hostname(link: string) {
        return new URL(link).hostname;
    }

    renderDate(date: string) {
        return date.split('T').length > 1 ? date.split('T')[0] : 'No Date';
    }
}
