import { Url } from 'url';

export default class Owner {
    constructor(
        public email: string,
        public name: string,
        public password?: string,
        public onwerid?: string,
        public urls?: Url[]
    ) {}
}
