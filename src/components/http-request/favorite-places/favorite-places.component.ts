import { Component } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places/places.component';

@Component({
  selector: 'app-favorite-places',
  standalone: true,
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './favorite-places.component.html',
  styleUrl: './favorite-places.component.scss'
})
export class FavoritePlacesComponent {

}
