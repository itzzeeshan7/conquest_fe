import { FormGroup } from '@angular/forms';

export function ValidatePasswordConfirm(f: FormGroup): { [key: string]: boolean } {
  const password = f.controls.password;
  const passwordConfirm = f.controls.passwordConfirm;
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.setErrors({ passwordConfirmErr: true });
  }
  return null;
}
