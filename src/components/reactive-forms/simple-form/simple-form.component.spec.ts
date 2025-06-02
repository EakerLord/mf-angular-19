import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SimpleFormComponent } from './simple-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SimpleFormComponent', () => {
  let fixture: ComponentFixture<SimpleFormComponent>;
  let component: SimpleFormComponent;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [SimpleFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all form fields and the login button', () => {
    expect(fixture.nativeElement.querySelector('input#email')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#password')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should have the login button disabled if form is invalid', () => {
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeTrue();
  });

  it('should enable the login button when form is valid', fakeAsync(() => {
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('secret?');
    component.form.get('email')?.markAsDirty();
    component.form.get('email')?.markAsTouched();
    component.form.get('password')?.markAsDirty();
    component.form.get('password')?.markAsTouched();
    fixture.detectChanges();
    tick();

    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.form.valid).toBeTrue();
    expect(btn.disabled).toBeFalse();
  }));

  it('should show email error message when invalid and touched/dirty', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsDirty();
    emailControl?.markAsTouched();
    fixture.detectChanges();

    expect(component.emailIsValid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('.login-form__error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Please enter a valid email.');
  });

  it('should show password error message when invalid and touched/dirty', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('short');
    passwordControl?.markAsDirty();
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    expect(component.passwordIsValid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('.login-form__error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Please enter a valid password');
  });

  it('should require password to contain a question mark', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('abcdef');
    passwordControl?.markAsDirty();
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    expect(passwordControl?.errors?.['mustContainQuestionMark']).toBeTrue();
    expect(component.passwordIsValid).toBeTrue();
  });

  it('should save form value to localStorage on valueChanges', fakeAsync(() => {
    component.form.get('email')?.setValue('save@test.com');
    component.form.get('password')?.setValue('secret?');
    tick(500);
    expect(localStorage.getItem('form')).toContain('save@test.com');
  }));

  it('should load form value from localStorage on init', () => {
    localStorage.setItem('form', JSON.stringify({ email: 'from@storage.com', password: 'storage?' }));
    const newFixture = TestBed.createComponent(SimpleFormComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    expect(newComponent.form.get('email')?.value).toBe('from@storage.com');
  });

  it('should log form value on submit', () => {
    spyOn(console, 'log');
    component.form.get('email')?.setValue('login@test.com');
    component.form.get('password')?.setValue('secret?');
    fixture.detectChanges();
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith(jasmine.objectContaining({
      email: 'login@test.com',
      password: 'secret?'
    }));
  });
});
