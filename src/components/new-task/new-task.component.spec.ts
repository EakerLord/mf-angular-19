import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { TaskService } from '../../services/tasks/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';

class MockTaskService {
  addTask = jasmine.createSpy('addTask');
}
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
class MockActivatedRoute {
  parent = {
    snapshot: {
      paramMap: {
        get: (key: string) => key === 'lessonId' ? '123' : null
      }
    }
  };
}

describe('NewTaskComponent', () => {
  let fixture: ComponentFixture<NewTaskComponent>;
  let component: NewTaskComponent;
  let taskService: MockTaskService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskComponent, FormsModule],
      providers: [
        provideRouter([]),
        { provide: TaskService, useClass: MockTaskService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;

    taskService = TestBed.inject(TaskService) as unknown as MockTaskService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields and buttons', () => {
    const titleInput = fixture.nativeElement.querySelector('input#title');
    const summaryTextarea = fixture.nativeElement.querySelector('textarea#summary');
    const dateInput = fixture.nativeElement.querySelector('input#due-date');
    const cancelBtn = fixture.nativeElement.querySelector('.add-task-form__button--cancel');
    const submitBtn = fixture.nativeElement.querySelector('.add-task-form__button--submit');
    expect(titleInput).toBeTruthy();
    expect(summaryTextarea).toBeTruthy();
    expect(dateInput).toBeTruthy();
    expect(cancelBtn).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('should call addTask and navigate on submit', () => {
    component.enteredTitle.set('Tarea Test');
    component.enteredSummary.set('Resumen Test');
    component.enteredDate.set('2025-06-02');
    component.lessonId.set('123');

    component.onSubmit();

    expect(taskService.addTask).toHaveBeenCalledWith(
      {
        title: 'Tarea Test',
        summary: 'Resumen Test',
        date: '2025-06-02',
        status: 'OPEN'
      },
      '123'
    );
    expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: jasmine.any(Object) });
  });

  it('should have Cancel button with routerLink', () => {
    const cancelBtn = fixture.nativeElement.querySelector('.add-task-form__button--cancel');
    expect(cancelBtn.getAttribute('ng-reflect-router-link')).toContain('..');
  });
});
