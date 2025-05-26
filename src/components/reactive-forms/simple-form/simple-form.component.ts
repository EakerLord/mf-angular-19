import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// Reactive forms
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) { return null };
  return { mustContainQuestionMark: true };
}
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') { return of(null) };
  return of({ notUnique: true });
}
/*
  Load the initial value of the form outside the life cycle of the component only if not is a SSR app.
  let initialEmailValue = '';
  const savedForm = localStorage.getItem('form');
  if (savedForm) { initialEmailValue = JSON.parse(savedForm).email };
*/
//

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './simple-form.component.html',
  styleUrl: './simple-form.component.scss'
})
export class SimpleFormComponent implements OnInit {
  private destrotRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  get emailIsValid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsValid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  ngOnInit(): void {
    // Reactive forms: Storage the form value from localStorage
    const formValue = localStorage.getItem('form');
    if (formValue) {
      // this.form.setValue(JSON.parse(formValue));
      this.form.patchValue(JSON.parse(formValue));
    }
    // Reactive forms: Storage the form value into localStorage
    const formSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe((val) => localStorage.setItem('form', JSON.stringify(val)));
    this.destrotRef.onDestroy(() => formSubscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
