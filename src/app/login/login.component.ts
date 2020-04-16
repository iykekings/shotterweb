import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { patternValidator } from 'src/shared/util';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { Alert } from 'src/interfaces/Alert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    submitting = false;
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            patternValidator(
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
            ),
        ]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        public titleService: Title,
        private auth: AuthService,
        private router: Router,
        private al: AlertService
    ) {
        titleService.setTitle('Login | Shotter');
    }

    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }
    isValid(input: AbstractControl): boolean {
        return input.valid && (input.dirty || input.touched);
    }
    isInValid(input: AbstractControl): boolean {
        return input.invalid && (input.dirty || input.touched);
    }

    login() {
        if (this.loginForm.valid) {
            this.submitting = true;
            this.auth.login(this.email.value, this.password.value).subscribe(
                (jwt) => {
                    localStorage.setItem('token', jwt.token);
                    this.submitting = false;
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.al.addAlert(new Alert(error.error?.message, 'danger'));
                    this.submitting = false;
                }
            );
        }
    }
}
