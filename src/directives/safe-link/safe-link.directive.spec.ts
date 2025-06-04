import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeLinkDirective } from './safe-link.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<a href="/test" [appSafeLink]="param">Test Link</a>`,
  standalone: true,
  imports: [SafeLinkDirective]
})
class TestComponent {
  param = '?test=123';
}

describe('SafeLinkDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let anchorDe: any;
  let anchorEl: HTMLAnchorElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    anchorDe = fixture.debugElement.query(By.directive(SafeLinkDirective));
    anchorEl = anchorDe.nativeElement;
  });

  it('should call window.confirm when clicked', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const event = new MouseEvent('click');
    anchorDe.triggerEventHandler('click', event);
    expect(window.confirm).toHaveBeenCalledWith('Do you want to leave the app?');
  });

  it('should prevent default if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    anchorDe.triggerEventHandler('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(anchorEl.getAttribute('href')).toBe('/test');
  });

  it('should append routeParam to href if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const event = new MouseEvent('click');
    anchorDe.triggerEventHandler('click', event);
    expect(anchorEl.getAttribute('href')).toBe('http://localhost:9876/test?test=123');
  });
});
