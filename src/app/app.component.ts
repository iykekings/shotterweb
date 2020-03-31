import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'shotter';
    constructor(private clipBoard: ClipboardService) {
        this.clipBoard.configure({ cleanUpAfterCopy: true });
    }
}
