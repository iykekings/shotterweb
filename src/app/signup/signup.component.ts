import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { patternValidator } from 'src/shared/util';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,
    patternValidator(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)
    ]),
    password: new FormControl('', [Validators.required,
    patternValidator(/(?=^.{6,}$)(?=.*\d)(?=.*[A-Z])(?=.*\W).*$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }


  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }

  isValid(input: AbstractControl): boolean {
    return input.valid && (input.dirty || input.touched);
  }

  isInValid(input: AbstractControl): boolean {
    return input.invalid && (input.dirty || input.touched);
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

}
