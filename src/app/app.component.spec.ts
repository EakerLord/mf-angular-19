import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { ErrorModalComponent } from '../shared/modal-error/error/error-modal.component';
import { ErrorService } from '../shared/modal-error/error.service';
import { provideRouter } from '@angular/router';

// Dummy data for testing
const DUMMY_LESSONS = [
  { id: '1', name: 'Lesson 1', avatar: 'avatar1.png' },
  { id: '2', name: 'Lesson 2', avatar: 'avatar2.png' }
];

// Mock ErrorService
class MockErrorService {
  error = jasmine.createSpy().and.returnValue('');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let errorService: MockErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, LessonComponent, ErrorModalComponent],
      providers: [
        provideRouter([]),
        { provide: ErrorService, useClass: MockErrorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    errorService = TestBed.inject(ErrorService) as unknown as MockErrorService;
    component.lessons = DUMMY_LESSONS;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render header component', () => {
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should render the list of lessons', () => {
    const lessonItems = fixture.nativeElement.querySelectorAll('app-lesson');
    expect(lessonItems.length).toBe(DUMMY_LESSONS.length);
  });

  it('should display the fallback message', () => {
    const fallback = fixture.nativeElement.querySelector('.mf-angular-19-remote-theme__fallback');
    expect(fallback.textContent).toContain('Select a lesson to see their tasks');
  });

  it('should update selectedLessonId when onSelectLesson is called', () => {
    component.onSelectLesson('2');
    expect(component.selectedLessonId).toBe('2');
  });

  it('should return the selected lesson', () => {
    component.selectedLessonId = '1';
    expect(component.selectedLesson).toEqual(DUMMY_LESSONS[0]);
  });

  it('should show error modal if error() returns a message', () => {
    errorService.error.and.returnValue('Test error');
    fixture.detectChanges();
    const errorModal = fixture.nativeElement.querySelector('app-error-modal');
    expect(errorModal).toBeTruthy();
    expect(errorModal.getAttribute('ng-reflect-message')).toBe('Test error');
  });

  it('should show router-outlet when a lesson is selected', () => {
    component.selectedLessonId = '1';
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should not show router-outlet when no lesson is selected', () => {
    component.selectedLessonId = '';
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeNull();
  });
});
