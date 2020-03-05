import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { patternValidator } from 'src/shared/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,
    patternValidator(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)
    ]),
    password: new FormControl('', [Validators.required,
    patternValidator(/(?=^.{6,}$)(?=.*\d)(?=.*[A-Z])(?=.*\W).*$/)
    ])
  });

  constructor() {
  }

  ngOnInit(): void {
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

}
