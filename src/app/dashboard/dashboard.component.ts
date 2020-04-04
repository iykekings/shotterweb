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
import { AlertService } from '../alert.service';
import { Alert } from 'src/interfaces/Alert';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    urls: Url[];
    alerts: Alert[];
    submitting = false;

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

    constructor(
        private urlService: UrlService,
        private al: AlertService,
        private titleService: Title
    ) {
        this.titleService.setTitle('Dashboard | Shotter');
    }

    ngOnInit(): void {
        this.fetchAllUrls();
    }

    fetchAllUrls() {
        this.urlService.fetchAllUrlByUser().subscribe(
            data => {
                this.urls = data;
            },
            error => {
                this.al.addAlert(new Alert(error.error?.message, 'danger'));
            }
        );
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
            this.submitting = true;
            const { redirect, directory } = this.createForm.value;
            this.urlService.createUrl(directory, redirect).subscribe(
                _ => {
                    this.al.addAlert(
                        new Alert('Short url created successfully', 'success', {
                            position: ['top', 'center'],
                        })
                    );
                    this.fetchAllUrls();
                    this.createForm.reset();
                    this.submitting = false;
                },
                error => {
                    this.al.addAlert(new Alert(error.error?.message, 'danger'));
                    this.submitting = false;
                }
            );
        }
    }
}
