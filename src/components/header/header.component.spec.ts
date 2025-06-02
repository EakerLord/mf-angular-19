import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.app-header__logo');
    expect(img).toBeTruthy();
    expect(img.src).toContain('assets/mf-angular-19/task-management-logo.png');
    expect(img.alt).toBe('A list of lessons in Angular 19');
  });

  it('should render the title', () => {
    const title = fixture.nativeElement.querySelector('.app-header__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Knowledge of Angular 19');
  });

  it('should render the description', () => {
    const description = fixture.nativeElement.querySelector('.app-header__description');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain('Senior-level knowledge with the Angular framework and version 19');
  });
});
