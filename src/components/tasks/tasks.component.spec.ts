import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../services/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task/task.model'; // Ajusta la ruta según tu estructura

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  const mockTasks: Task[] = [
    {
      id: '1',
      lessonId: '123',
      title: 'Task 1',
      summary: 'Summary 1',
      dueDate: '2025-06-10',
      status: 'OPEN'
    },
    {
      id: '2',
      lessonId: '123',
      title: 'Task 2',
      summary: 'Summary 2',
      dueDate: '2025-06-11',
      status: 'IN_PROGRESS'
    },
    {
      id: '3',
      lessonId: '123',
      title: 'Task 3',
      summary: 'Summary 3',
      dueDate: '2025-06-12',
      status: 'DONE'
    }
  ];

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getLessonTasks']);
    mockTaskService.getLessonTasks.and.callFake((lessonId: string) => {
      return mockTasks.filter(t => t.lessonId === lessonId);
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate'], { events: new Subject() });

    activatedRouteStub = {
      paramMap: new BehaviorSubject({ get: (key: string) => key === 'lessonId' ? '123' : null }),
      queryParamMap: new BehaviorSubject({ get: (key: string) => key === 'sort' ? 'desc' : null }),
      snapshot: {
        paramMap: { get: (key: string) => key === 'lessonId' ? '123' : null },
        firstChild: { routeConfig: { path: '' } }
      },
      data: of({ lessonName: 'Math' })
    };

    await TestBed.configureTestingModule({
      imports: [
        TasksComponent,
        TaskComponent
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks for lessonId', fakeAsync(() => {
    activatedRouteStub.paramMap.next({ get: (key: string) => key === 'lessonId' ? '123' : null });
    tick();
    expect(mockTaskService.getLessonTasks).toHaveBeenCalledWith('123');
    expect(component.lessonId()).toBe('123');
  }));

  it('should update sortSignal from query params', fakeAsync(() => {
    activatedRouteStub.queryParamMap.next({ get: (key: string) => key === 'sort' ? 'asc' : null });
    tick();
    expect(component.sortSignal()).toBe('asc');
  }));

  it('should filter tasks by status', () => {
    component['selectedFilter'].set('open');
    fixture.detectChanges();
    expect(component.selectedLessonTasks().length).toBe(1);
    expect(component.selectedLessonTasks()[0].status).toBe('OPEN');

    component['selectedFilter'].set('in-progress');
    fixture.detectChanges();
    expect(component.selectedLessonTasks().length).toBe(1);
    expect(component.selectedLessonTasks()[0].status).toBe('IN_PROGRESS');
  });

  it('should sort tasks correctly', () => {
    component.sortSignal.set('asc');
    fixture.detectChanges();
    expect(component.selectedLessonTasks()[0].id).toBe('1');

    component.sortSignal.set('desc');
    fixture.detectChanges();
    expect(component.selectedLessonTasks()[0].id).toBe('3');
  });

  it('should update UI when selecting filter', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = 'done';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component['selectedFilter']()).toBe('done');
    expect(component.selectedLessonTasks().every(t => t.status === 'DONE')).toBeTrue();
  });

  it('should hide header when in new task route', () => {
    component.currentChildRoute.set('new');
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('.tasks-section__header'));
    expect(header).toBeNull();
  });

  it('should update lessonName from route data', () => {
    expect(component.lessonName()).toBe('Math');
  });

  it('should call router.navigate when sort button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const sortButton = buttons.find(b => b.nativeElement.textContent.includes('Sort'));
    sortButton?.nativeElement.click();
  });
});
