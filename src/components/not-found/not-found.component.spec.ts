import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { provideRouter } from '@angular/router';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let component: NotFoundComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.nativeElement.querySelector('.not-found__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Sorry! Page not found');
  });

  it('should render the description', () => {
    const desc = fixture.nativeElement.querySelector('.not-found__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toContain('The URL you requested could not be found.');
  });

  it('should render the back link with correct routerLink', () => {
    const link = fixture.nativeElement.querySelector('.not-found__back-link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('ng-reflect-router-link')).toContain('/a19');
  });
});
