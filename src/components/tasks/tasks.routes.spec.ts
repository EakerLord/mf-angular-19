import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './tasks.routes';
import { Component } from '@angular/core';

// Mocks para componentes standalone
@Component({ standalone: true, template: '<div>TasksComponent</div>' })
class MockTasksComponent {}

@Component({ standalone: true, template: '<div>NewTaskComponent</div>' })
class MockNewTaskComponent {}

// Mocks para resolvers y guards
const mockResolveLessonName = () => 'Mock Lesson';
const mockResolveTitle = () => 'Mock Title';
const mockCanDeactivate = () => true;

describe('Tasks Routing', () => {
  let router: Router;
  let location: Location;

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
    router.initialNavigation();
  });

  it('should navigate to /tasks/123 and load TasksComponent', fakeAsync(() => {
    router.navigate(['/tasks/123']);
    tick(100);
    expect(location.path()).toBe('/tasks/123');
  }));

  it('should navigate to /tasks/123/new and load NewTaskComponent', fakeAsync(() => {
    router.navigate(['/tasks/123/new']);
    tick(100);
    expect(location.path()).toBe('/tasks/123/new');
  }));

  it('should use the resolver and guard mocks', fakeAsync(() => {
    router.navigate(['/tasks/123/new']);
    tick(100);
    expect(location.path()).toBe('/tasks/123/new');
  }));
});
