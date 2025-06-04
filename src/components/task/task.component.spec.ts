import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { TaskService } from '../../services/tasks/tasks.service';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TemperaturePipe } from '../../pipes/temperature/temperature.pipe';
import { SafeLinkDirective } from '../../directives/safe-link/safe-link.directive';
import { AuthDirective } from '../../directives/auth/auth.directive';
import { NewRequestComponent } from '../http-request/new-request/new-request.component';
import { SimpleFormComponent } from '../reactive-forms/simple-form/simple-form.component';
import { ComplexFormComponent } from '../reactive-forms/complex-form/complex-form.component';

const MOCK_TASK: Task = {
  id: '1',
  lessonId: '1',
  title: 'Test Task',
  summary: 'A summary',
  dueDate: '2025-06-02',
  status: 'OPEN'
};

class MockTaskService {
  updateTaskStatus = jasmine.createSpy('updateTaskStatus');
  removeTask = jasmine.createSpy('removeTask');
}

@Component({
  template: `<app-task [task]="task"></app-task>`,
  standalone: true,
  imports: [
    TaskComponent
  ]
})
class HostComponent {
  task: Task = { ...MOCK_TASK };
}

describe('TaskComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let taskService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HostComponent,
        CardComponent,
        DatePipe,
        TemperaturePipe,
        SafeLinkDirective,
        AuthDirective,
        NewRequestComponent,
        SimpleFormComponent,
        ComplexFormComponent
      ],
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as unknown as MockTaskService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    expect(taskComponent).toBeTruthy();
  });

  it('should render the task title, summary, and status', () => {
    const title = fixture.nativeElement.querySelector('.task-card__title');
    const summary = fixture.nativeElement.querySelector('.task-card__summary');
    const status = fixture.nativeElement.querySelector('.task-card__status');
    expect(title.textContent).toContain(MOCK_TASK.title);
    expect(summary.textContent).toContain(MOCK_TASK.summary);
    expect(status.textContent).toContain('Open');
  });

  it('should call updateTaskStatus when onChangeTaskStatus is called', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    taskComponent.onChangeTaskStatus(MOCK_TASK.id, 'in-progress');
    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(MOCK_TASK.id, 'IN_PROGRESS');
  });

  it('should call removeTask when onCompleteTask is called', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    taskComponent.onCompleteTask();
    expect(taskService.removeTask).toHaveBeenCalledWith(MOCK_TASK.id);
  });

  it('should update isAddingRequest when onStartAddRequest/onCloseAddRequest are called', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    taskComponent.onStartAddRequest();
    expect(taskComponent.isAddingRequest()).toBeTrue();
    taskComponent.onCloseAddRequest();
    expect(taskComponent.isAddingRequest()).toBeFalse();
  });

  it('should update isShowingSimpleForm and isShowingComplexForm', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    taskComponent.onShowSimpleForm();
    expect(taskComponent.isShowingSimpleForm()).toBeTrue();
    expect(taskComponent.isShowingComplexForm()).toBeFalse();

    taskComponent.onShowComplexForm();
    expect(taskComponent.isShowingSimpleForm()).toBeFalse();
    expect(taskComponent.isShowingComplexForm()).toBeTrue();
  });

  it('should update taskStatus computed signal when task status changes', () => {
    const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
    host.task = { ...MOCK_TASK, status: 'IN_PROGRESS' };
    fixture.detectChanges();
    expect(taskComponent.taskStatus()).toBe('Working on it');
    host.task = { ...MOCK_TASK, status: 'DONE' };
    fixture.detectChanges();
    expect(taskComponent.taskStatus()).toBe('Completed');
  });

  it('should render the due date using DatePipe', () => {
    const dateElem = fixture.nativeElement.querySelector('.task-card__date');
    expect(dateElem.textContent).toContain(new DatePipe('en-US').transform(MOCK_TASK.dueDate, 'fullDate'));
  });

// it('should increment clickCount and update clickCount$', (done) => {
//   const taskComponent = fixture.debugElement.children[0].componentInstance as TaskComponent;
//   let emissionCount = 0;
//   let latestValue = 0;

//   const sub = taskComponent.clickCount$.subscribe(val => {
//     latestValue = val;
//     emissionCount++;
//     if (emissionCount === 1) {
//       expect(latestValue).toBe(0);
//       taskComponent.onClickObservable();

//       Promise.resolve().then(() => {
//         // Espera el siguiente microtask
//       });
//     } else if (emissionCount === 2) {
//       expect(latestValue).toBe(1);
//       sub.unsubscribe();
//       done();
//     }
//   });
// });
});
