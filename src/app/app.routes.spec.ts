import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { routes as tasksRoutes } from '../components/tasks/tasks.routes';

import { Component } from '@angular/core';

@Component({ standalone: true, template: '' })
class DummyComponent {}

@Component({ standalone: true, template: '' })
class MockNotFoundComponent {}

const testRoutes = routes.map(route => {
  if (route.path === '**') {
    return {
      ...route,
      loadComponent: () => Promise.resolve(MockNotFoundComponent)
    };
  }
  return route;
});

const childPaths = tasksRoutes.map(r => r.path);

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(testRoutes)],
      imports: [AppComponent, DummyComponent, MockNotFoundComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create the router', () => {
    expect(router).toBeTruthy();
  });

  it('should navigate to root and load AppComponent', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('');
  }));

  childPaths.forEach(path => {
    it(`should navigate to child route: ${path}`, fakeAsync(() => {
      router.navigate([path]);
      tick();
      expect(location.path()).toBe(`/${path}`);
    }));
  });

  it('should navigate to not found for unknown path', fakeAsync(() => {
    router.navigate(['/unknownpath']);
    tick(500);
    expect(location.path()).toBe('/unknownpath');
  }));
});
