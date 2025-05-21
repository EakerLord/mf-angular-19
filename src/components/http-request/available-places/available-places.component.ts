import { Component, signal } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places/places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  imports: [PlacesComponent, PlacesContainerComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.scss'
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
}
