import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustMatch(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { mustMatch: true };
  }
  return null;
}

function genericMustMatch(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);
    if (control1?.value !== control2?.value) {
      return { mustMatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent {
  form = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    passwords: new FormGroup({
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      confirmPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
    }, {validators: [mustMatch]}),
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    address: new FormGroup({
      street: new FormControl('', {validators: [Validators.required]}),
      number: new FormControl('', {validators: [Validators.required]}),
      postalCode: new FormControl('', {validators: [Validators.required]}),
      city: new FormControl('', {validators: [Validators.required]}),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {validators: [Validators.required]}),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    terms: new FormControl(false, {validators: [Validators.required]}),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form.value);
      return
    }
  };

  onReset() {this.form.reset()};
}
