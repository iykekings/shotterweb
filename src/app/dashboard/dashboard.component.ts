import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import Url from 'src/interfaces/Url';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { patternValidator } from 'src/shared/util';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    urls: Url[];

    createForm = new FormGroup({
        longUrl: new FormControl('', [
            Validators.required,
            patternValidator(
                /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            ),
        ]),
        shortUrl: new FormControl('', [
            Validators.required,
            patternValidator(/^[\w-_]*$/),
        ]),
    });

    constructor(private urlService: UrlService) {}

    ngOnInit(): void {
        this.fetchAllUrls();
    }

    fetchAllUrls() {
        this.urlService.fetchAllUrlByUser().subscribe(data => {
            this.urls = data;
        });
    }
    isValid(input: AbstractControl): boolean {
        return input.valid && (input.dirty || input.touched);
    }
    isInValid(input: AbstractControl): boolean {
        return input.invalid && (input.dirty || input.touched);
    }
    get longUrl() {
        return this.createForm.get('longUrl');
    }
    get shortUrl() {
        return this.createForm.get('shortUrl');
    }
}
