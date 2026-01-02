import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false,
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: FormGroup | FormControl;

  constructor() {}

  ngOnInit(): void {}

  get errorMessage() {
    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key) && this.control.invalid && this.control.touched) {
        return this.getValidationMessage(key, this.control.errors[key]);
      }
    }
    return null;
  }

  private getValidationMessage(validator: string, validatorValue?: any) {
    const messages = {
      required: 'This field is required',
      email: 'Invalid email format',
      passwordConfirmErr: 'Passwords must match',
      minlength: 'Minimum number of characters: ' + validatorValue.requiredLength,
      pattern: 'Invalid phone format',
    };
    // @ts-ignore
    return messages[validator];
  }
}
