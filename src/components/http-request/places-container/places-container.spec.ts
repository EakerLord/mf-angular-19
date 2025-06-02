import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesContainerComponent } from './places-container.component';

@Component({
  template: `<app-places-container [title]="'Test Title'"><p>Contenido</p></app-places-container>`,
  standalone: true,
  imports: [PlacesContainerComponent]
})
class HostComponent {}

describe('PlacesContainerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render the title from the input', () => {
    const title = fixture.nativeElement.querySelector('.content-section__title');
    expect(title.textContent).toBe('Test Title');
  });

  it('should render projected content', () => {
    const projected = fixture.nativeElement.querySelector('p');
    expect(projected.textContent).toBe('Contenido');
  });
});
