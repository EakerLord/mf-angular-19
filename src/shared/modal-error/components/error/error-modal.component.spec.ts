import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ErrorModalComponent } from './error-modal.component';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-modal',
  template: `<ng-content></ng-content>`,
  standalone: true
})
class MockModalComponent {}

class MockErrorService {
  clearError = jasmine.createSpy('clearError');
}

@Component({
  template: `
    <app-error-modal
      [title]="title"
      [message]="message"
    ></app-error-modal>
  `,
  standalone: true,
  imports: [ErrorModalComponent, MockModalComponent]
})
class HostComponent {
  title = '¡Error!';
  message = 'Algo salió mal';
}

describe('ErrorModalComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let errorService: MockErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: ErrorService, useClass: MockErrorService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const errorModalDebug = fixture.debugElement.query(By.directive(ErrorModalComponent));
    errorService = errorModalDebug.componentInstance['errorService'];
  });

  it('should create the error modal component', () => {
    const errorModal = fixture.debugElement.query(By.directive(ErrorModalComponent));
    expect(errorModal).toBeTruthy();
  });

  it('should display title and message', () => {
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('.modal-error__title')).nativeElement;
    const messageEl = fixture.debugElement.query(By.css('.modal-error__message')).nativeElement;

    expect(titleEl.textContent).toContain('¡Error!');
    expect(messageEl.textContent).toContain('Algo salió mal');
  });

  it('should call clearError when button is clicked', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.modal-error__button')).nativeElement;
    button.click();
    expect(errorService.clearError).toHaveBeenCalled();
  });

  it('should project content into app-modal', () => {
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('app-modal'));
    expect(modal).toBeTruthy();
    const modalContent = modal.query(By.css('.modal-error'));
    expect(modalContent).toBeTruthy();
  });

  it('should update title and message when host changes them', () => {
    host.title = 'Nuevo título';
    host.message = 'Nuevo mensaje';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.modal-error__title')).nativeElement;
    const messageEl = fixture.debugElement.query(By.css('.modal-error__message')).nativeElement;

    expect(titleEl.textContent).toContain('Nuevo título');
    expect(messageEl.textContent).toContain('Nuevo mensaje');
  });
});
