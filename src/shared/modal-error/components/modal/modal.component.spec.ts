import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

@Component({
  template: `
    <app-modal>
      <span class="test-content">Contenido de prueba</span>
    </app-modal>
  `,
  standalone: true,
  imports: [ModalComponent]
})
class HostComponent {}

describe('ModalComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    const modal = fixture.debugElement.query(By.directive(ModalComponent));
    expect(modal).toBeTruthy();
  });

  it('should project content inside the dialog', () => {
    const projectedContent = fixture.debugElement.query(By.css('.test-content'));
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.nativeElement.textContent).toContain('Contenido de prueba');
  });

  it('should call showModal on the dialog element after view init', () => {
    const modalDebug = fixture.debugElement.query(By.directive(ModalComponent));
    const modalInstance = modalDebug.componentInstance as ModalComponent;

    const dialogRef = modalInstance['dialogEl']();
    spyOn(dialogRef.nativeElement, 'showModal');

    modalInstance.ngAfterViewInit();

    expect(dialogRef.nativeElement.showModal).toHaveBeenCalled();
  });
});
