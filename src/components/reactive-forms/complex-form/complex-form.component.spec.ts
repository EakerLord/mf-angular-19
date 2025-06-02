import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplexFormComponent } from './complex-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ComplexFormComponent', () => {
  let fixture: ComponentFixture<ComplexFormComponent>;
  let component: ComplexFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all form fields', () => {
    expect(fixture.nativeElement.querySelector('input#email')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#password')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#confirm-password')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#first-name')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#last-name')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#street')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#number')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#postal-code')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#city')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('select#role')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#google')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#friend')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#other')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#terms-and-conditions')).toBeTruthy();
  });

  it('should show error if form is invalid and touched', () => {
    component.form.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('.signup-form__error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Invalid form');
  });

  it('should require email, password, firstName, lastName, address, and terms', () => {
    component.form.patchValue({
      email: '',
      passwords: { password: '', confirmPassword: '' },
      firstName: '',
      lastName: '',
      address: { street: '', number: '', postalCode: '', city: '' },
      terms: false
    });
    component.form.markAllAsTouched();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTrue();
  });

  it('should require valid email format', () => {
    component.form.get('email')?.setValue('invalid-email');
    component.form.get('email')?.markAsTouched();
    fixture.detectChanges();
    expect(component.form.get('email')?.invalid).toBeTrue();
  });

  it('should require matching passwords', () => {
    component.form.get('passwords.password')?.setValue('abcdef');
    component.form.get('passwords.confirmPassword')?.setValue('ghijkl');
    component.form.get('passwords')?.markAllAsTouched();
    fixture.detectChanges();
    expect(component.form.get('passwords')?.errors?.['mustMatch']).toBeTrue();
  });

  it('should enable submit button only if form is valid', () => {
    let submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeTrue();

    component.form.patchValue({
      email: 'test@example.com',
      passwords: { password: 'abcdef', confirmPassword: 'abcdef' },
      firstName: 'Test',
      lastName: 'User',
      address: { street: 'Main', number: '1', postalCode: '12345', city: 'City' },
      role: 'student',
      terms: true
    });
    component.form.markAllAsTouched();
    fixture.detectChanges();

    submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.form.valid).toBeTrue();
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should reset the form when Reset button is clicked', () => {
    component.form.patchValue({
      email: 'test@example.com',
      passwords: { password: 'abcdef', confirmPassword: 'abcdef' },
      firstName: 'Test',
      lastName: 'User',
      address: { street: 'Main', number: '1', postalCode: '12345', city: 'City' },
      role: 'student',
      terms: true
    });
    fixture.detectChanges();

    const resetBtn = fixture.nativeElement.querySelector('button[type="reset"]');
    resetBtn.click();
    fixture.detectChanges();

    expect(component.form.pristine).toBeTrue();
    expect(component.form.get('email')?.value).toBeNull();
  });

  it('should not submit if form is invalid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      email: '',
      passwords: { password: '', confirmPassword: '' },
      firstName: '',
      lastName: '',
      address: { street: '', number: '', postalCode: '', city: '' },
      role: 'student',
      terms: false
    });
    component.form.markAllAsTouched();
    fixture.detectChanges();

    component.onSubmit();
    expect(console.log).toHaveBeenCalled();
  });

  it('should submit if form is valid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      email: 'test@example.com',
      passwords: { password: 'abcdef', confirmPassword: 'abcdef' },
      firstName: 'Test',
      lastName: 'User',
      address: { street: 'Main', number: '1', postalCode: '12345', city: 'City' },
      role: 'student',
      terms: true
    });
    component.form.markAllAsTouched();
    fixture.detectChanges();

    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });
});
