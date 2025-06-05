import { dummyCanMatch } from './dummy-can-match.guard';
import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';

describe('dummyCanMatch', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let alertSpy: jasmine.Spy;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    routerSpy.parseUrl.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });

    alertSpy = spyOn(window, 'alert');
  });

  it('should return true when random < 0.98', () => {
    spyOn(Math, 'random').and.returnValue(0.7);

    const result = TestBed.runInInjectionContext(() =>
      dummyCanMatch({} as any, [])
    );

    expect(result).toBeTrue();
    expect(alertSpy).not.toHaveBeenCalled();
    expect(routerSpy.parseUrl).not.toHaveBeenCalled();
  });

  it('should alert and redirect when random >= 0.98', () => {
    spyOn(Math, 'random').and.returnValue(0.99);
    const urlTree = {} as UrlTree;
    routerSpy.parseUrl.and.returnValue(urlTree);

    const result = TestBed.runInInjectionContext(() =>
      dummyCanMatch({} as any, [])
    );

    expect(alertSpy).toHaveBeenCalledWith('dummyCanMatch -> You do not have access');
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/a19');

    expect(result instanceof RedirectCommand).toBeTrue();

    if (result instanceof RedirectCommand) {
      expect(result.redirectTo).toBe(urlTree);
    }
  });
});
