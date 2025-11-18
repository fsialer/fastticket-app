// Ejemplo de uso del componente InputCustom

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputCustom } from './input/input';

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule, InputCustom],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-input
        label="Email"
        type="email"
        placeholder="Enter your email"
        formControlName="email"
        [hasError]="!!(form.get('email')?.invalid && form.get('email')?.touched)"
        errorMessage="Please enter a valid email">
      </app-input>

      <app-input
        label="Password"
        type="password"
        placeholder="Enter your password"
        formControlName="password"
        [hasError]="!!(form.get('password')?.invalid && form.get('password')?.touched)"
        errorMessage="Password must be at least 6 characters">
      </app-input>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class ExampleUsageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}