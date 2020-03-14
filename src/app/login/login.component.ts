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

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
        private router: Router
    ) {
        titleService.setTitle('Login | Shotter');
    }

    ngOnInit(): void {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
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
            this.auth.login(this.email.value, this.password.value).subscribe(
                jwt => {
                    localStorage.setItem('token', jwt.token);
                    this.router.navigate(['/dashboard']);
                },
                error => console.log('wrong password or email', error)
                // TODO: show error on UI
            );
        }
    }
}
