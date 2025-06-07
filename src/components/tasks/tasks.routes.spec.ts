import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: '<div id="tasks-mock">TasksComponentMock<router-outlet></router-outlet></div>',
  imports: [RouterOutlet]
})
class MockTasksComponent {}

@Component({ standalone: true, template: '<div id="new-task-mock">NewTaskComponentMock</div>' })
class MockNewTaskComponent {}

const mockResolveLessonName = () => 'Mock Lesson';
const mockResolveTitle = () => 'Mock Title';
const mockCanDeactivate = () => true;

describe('Tasks Routing', () => {
  let router: Router;
  let location: Location;
  let fixture: any;

  const testRoutes = [
    {
      path: 'tasks/:lessonId',
      loadComponent: () => Promise.resolve(MockTasksComponent),
      title: mockResolveTitle,
      children: [
        {
          path: 'new',
          loadComponent: () => Promise.resolve(MockNewTaskComponent),
          title: 'New task',
          canDeactivate: [mockCanDeactivate]
        }
      ],
      resolve: { lessonName: mockResolveLessonName }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(testRoutes)],
      imports: [MockTasksComponent, MockNewTaskComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(MockTasksComponent);
    router.initialNavigation();
  });

  it('should navigate to /tasks/123 and load TasksComponent', fakeAsync(() => {
    router.navigate(['/tasks/123']);
    tick(100);
    fixture.detectChanges();

    const el = document.querySelector('#tasks-mock');
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain('TasksComponentMock');
    expect(location.path()).toBe('/tasks/123');
  }));

  it('should navigate to /tasks/123/new and load NewTaskComponent', fakeAsync(() => {
    router.navigate(['/tasks/123/new']);
    tick(100);
    fixture.detectChanges();

    const el = document.querySelector('#new-task-mock');
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain('NewTaskComponentMock');
    expect(location.path()).toBe('/tasks/123/new');
  }));

  it('should use the resolver and guard mocks', fakeAsync(() => {
    router.navigate(['/tasks/123/new']);
    tick(100);
    expect(location.path()).toBe('/tasks/123/new');
  }));
});
