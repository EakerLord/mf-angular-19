import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-card>
      <span class="test-content">Contenido de prueba</span>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent]
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the card component', () => {
    const card = fixture.debugElement.query(By.directive(CardComponent));
    expect(card).toBeTruthy();
  });

  it('should project content inside the card', () => {
    const projectedContent = fixture.debugElement.query(By.css('.test-content'));
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.nativeElement.textContent).toContain('Contenido de prueba');
  });

  it('should have the card class on the div', () => {
    const cardDiv = fixture.debugElement.query(By.css('.card'));
    expect(cardDiv).toBeTruthy();
  });
});
