import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesComponent } from './places.component';
import { Place } from '../place.model';

const MOCK_PLACES: Place[] = [
  {
    id: '1',
    title: 'Place One',
    image: { src: 'img1.jpg', alt: 'Image One' },
    lat: 10.123,
    lon: 20.456
  },
  {
    id: '2',
    title: 'Place Two',
    image: { src: 'img2.jpg', alt: 'Image Two' },
    lat: -5.321,
    lon: 15.789
  }
];

// Host component to handle input signals and output signals.
@Component({
  template: `
    <app-places [places]="places" (selectPlace)="onSelectPlace($event)"></app-places>
  `,
  standalone: true,
  imports: [PlacesComponent]
})
class HostComponent {
  places = MOCK_PLACES;
  selectedPlace?: Place;
  onSelectPlace(place: Place) {
    this.selectedPlace = place;
  }
}

describe('PlacesComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a list item for each place', () => {
    const items = fixture.nativeElement.querySelectorAll('.places-list__item');
    expect(items.length).toBe(MOCK_PLACES.length);
  });

  it('should render the correct title and image for each place', () => {
    const titles = fixture.nativeElement.querySelectorAll('.places-list__title');
    const images = fixture.nativeElement.querySelectorAll('.places-list__image');
    MOCK_PLACES.forEach((place, idx) => {
      expect(titles[idx].textContent).toBe(place.title);
      expect(images[idx].src).toContain(place.image.src);
      expect(images[idx].alt).toBe(place.image.alt);
    });
  });

  it('should emit selectPlace event when a place is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.places-list__button');
    buttons[1].click();
    fixture.detectChanges();
    expect(hostComponent.selectedPlace).toEqual(MOCK_PLACES[1]);
  });
});
