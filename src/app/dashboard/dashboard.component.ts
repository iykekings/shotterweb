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
        redirect: new FormControl('', [
            Validators.required,
            patternValidator(
                /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            ),
        ]),
        directory: new FormControl('', [
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
    get redirect() {
        return this.createForm.get('redirect');
    }
    get directory() {
        return this.createForm.get('directory');
    }

    create() {
        if (this.createForm.valid) {
            const { redirect, directory } = this.createForm.value;
            this.urlService.createUrl(directory, redirect).subscribe(
                _ => this.fetchAllUrls(),
                error => console.error(error)
            );
            this.createForm.reset();
            // fetchAllUrls
        }
    }
}
