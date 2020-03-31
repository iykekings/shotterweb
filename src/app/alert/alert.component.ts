import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { Alert } from 'src/interfaces/Alert';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() data: Alert;
    @Output() delete = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {
        if (this.data.config?.onLoad) {
            this.data.config.onLoad(this.data.id);
        }

        // remove alert after 1s
        setTimeout(() => this.requestDelete(), 1500);
    }

    bg() {
        switch (this.data.type) {
            case 'confirm':
                return '#0064b7';
            case 'warning':
                return '#f9a825';
            case 'info':
                return '#0064b7';
            case 'success':
                return '#2bbd7e';
            case 'danger':
                return '#fc6a6a';
            default:
                return '#0064b7';
        }
    }

    requestDelete() {
        this.delete.emit(this.data.id);
    }

    ngOnDestroy(): void {
        if (this.data.config?.onClose) {
            this.data.config.onClose(this.data.id);
        }
    }
}
