import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { patternValidator } from 'src/shared/util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,
    patternValidator(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)
    ]),
    password: new FormControl('', [Validators.required,
    patternValidator(/(?=^.{6,}$)(?=.*\d)(?=.*[A-Z])(?=.*\W).*$/)
    ])
  });

  constructor(public titleService: Title) {
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
      console.log(this.loginForm.value);
    }
  }

}
