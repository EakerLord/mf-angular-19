import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRequestComponent } from './new-request.component';
import { AvailablePlacesComponent } from '../available-places/available-places.component';
import { FavoritePlacesComponent } from '../favorite-places/favorite-places.component';

describe('NewRequestComponent', () => {
  let component: NewRequestComponent;
  let fixture: ComponentFixture<NewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequestComponent, AvailablePlacesComponent, FavoritePlacesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dialog and header', () => {
    const dialog = fixture.nativeElement.querySelector('dialog.place-picker');
    expect(dialog).toBeTruthy();

    const header = fixture.nativeElement.querySelector('.place-picker__header');
    expect(header).toBeTruthy();

    const title = fixture.nativeElement.querySelector('.place-picker__title');
    expect(title.textContent).toBe('PlacePicker');
  });

  it('should render the description', () => {
    const desc = fixture.nativeElement.querySelector('.place-picker__description');
    expect(desc.textContent).toContain('Create your personal collection of places');
  });

  it('should render both child components', () => {
    const fav = fixture.nativeElement.querySelector('app-favorite-places');
    const avail = fixture.nativeElement.querySelector('app-available-places');
    expect(fav).toBeTruthy();
    expect(avail).toBeTruthy();
  });

  it('should emit close event when "Close HTTP request" button is clicked', () => {
    spyOn(component.close, 'emit');
    const button = fixture.nativeElement.querySelector('.place-picker__button');
    button.click();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
