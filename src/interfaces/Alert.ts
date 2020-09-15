export class Alert {
    public id: string;
    constructor(
        public message: string,
        public type: 'confirm' | 'danger' | 'success' | 'warning' | 'info',
        public config?: Config
    ) {
        this.id = `${new Date().toISOString()}${message}${type}`;
    }
}

interface Config {
    position?: string[];
    onClose?: (id: string) => void;
    onLoad?: (id: string) => void;
    onConfirm?: (id: string) => void;
    onRject?: (id: string) => void;
}
