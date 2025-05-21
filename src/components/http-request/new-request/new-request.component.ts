import { Component, output } from '@angular/core';
import { AvailablePlacesComponent } from '../available-places/available-places.component';
import { FavoritePlacesComponent } from '../favorite-places/favorite-places.component';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [AvailablePlacesComponent, FavoritePlacesComponent],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class NewRequestComponent {
  close = output<void>();

  onCancel() {
    this.close.emit();
  }
}
