import { Component, input } from '@angular/core';

@Component({
  selector: 'app-places-container',
  standalone: true,
  imports: [],
  templateUrl: './places-container.component.html',
  styleUrl: './places-container.component.scss'
})
export class PlacesContainerComponent {
  title = input.required<string>();
}
