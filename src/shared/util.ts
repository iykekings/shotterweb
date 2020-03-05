import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternValidator(re: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const match = re.test(control.value);
    return match ? null : { pattern: { value: control.value } };
  };
}
