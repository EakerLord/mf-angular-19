import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonComponent } from './lesson.component';
import { provideRouter } from '@angular/router';

const MOCK_LESSON = {
  id: '42',
  name: 'Testing Angular',
  avatar: 'testing-angular.png'
};

@Component({
  template: `
    <app-lesson
      [lesson]="lesson"
      [selected]="selected"
      (select)="onSelect($event)">
    </app-lesson>
  `,
  standalone: true,
  imports: [LessonComponent]
})
class HostComponent {
  lesson = MOCK_LESSON;
  selected = true;
  selectedId?: string;
  onSelect(id: string) {
    this.selectedId = id;
  }
}

describe('LessonComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the lesson name and image', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.lesson-card__image');
    const name: HTMLElement = fixture.nativeElement.querySelector('.lesson-card__name');
    expect(img.src).toContain(MOCK_LESSON.avatar);
    expect(img.alt).toBe(MOCK_LESSON.name);
    expect(name.textContent).toBe(MOCK_LESSON.name);
  });

  it('should emit select event when button is clicked', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.lesson-card__button');
    btn.click();
    fixture.detectChanges();
    expect(host.selectedId).toBe(MOCK_LESSON.id);
  });

  it('should set the correct routerLink', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.lesson-card__button');
    expect(btn.getAttribute('ng-reflect-router-link')).toContain(MOCK_LESSON.id);
  });

  it('should compute the correct imagePath', () => {
    const lessonDebug = fixture.debugElement.children[0].componentInstance as LessonComponent;
    expect(lessonDebug.imagePath()).toBe('assets/mf-angular-19/' + MOCK_LESSON.avatar);
  });
});
