import { Component, DestroyRef, inject, OnInit, signal, runInInjectionContext, EnvironmentInjector, Type } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { RemoteServicesRegistry } from '../../../shared/remote-services.registry';
import type { PlacesService } from 'host/PlacesService';
import { Place } from '../place.model';
import { PlacesComponent } from '../places/places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { ErrorService } from '../../../shared/modal-error/error.service';
@Component({
  selector: 'app-available-places',
  standalone: true,
  imports: [PlacesComponent, PlacesContainerComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.scss'
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  localError = signal('');
  errorService = inject(ErrorService);
  serviceError = signal('');

  private placesService!: InstanceType<typeof PlacesService>;
  private envInjector = inject(EnvironmentInjector);
  private destroRef = inject(DestroyRef);

  async ngOnInit() {
    this.isFetching.set(true);
    try {
// -- Load in runtime the host service instance via loadRemoteModule from remoteEntry.js ------------------------------------------------
      const hostServiceModule = await loadRemoteModule(
        { type: 'module', remoteEntry: 'http://localhost:4200/remoteEntry.js', exposedModule: './PlacesService' }
      );
// -- runInInjectionContext allows to instance localy the host service via EnvironmentInjector  -----------------------------------------
      runInInjectionContext(this.envInjector, () => {
// -- RemoteServicesRegistry ensures the same instance between components of the remote -------------------------------------------------
        RemoteServicesRegistry.placesService ??= this.envInjector.get(hostServiceModule.PlacesService as unknown as Type<PlacesService>);
        this.placesService = RemoteServicesRegistry.placesService!;
      });
// -- Use of the host service -----------------------------------------------------------------------------------------------------------
      const sub = this.placesService.loadAvailablePlaces()
        .subscribe({
          next: (places: Place[]) => this.places.set(places),
          error: (error: Error) => { this.localError.set(error.message) },
          complete: () => this.isFetching.set(false)
        });
      this.destroRef.onDestroy(() => sub.unsubscribe());
// --------------------------------------------------------------------------------------------------------------------------------------
    } catch (err) {
      this.localError.set('The remote service could not be loaded.');
      this.isFetching.set(false);
    }
  }

  onSelectPlace(selectedPlace: Place) {
    const sub = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      error: (error: Error) => {
        console.error(error.message);
        this.errorService.showError('Problem adding place, please try again.')
      }
    });
    this.destroRef.onDestroy(() => sub.unsubscribe());
  }
}
