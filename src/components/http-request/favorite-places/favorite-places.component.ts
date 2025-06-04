import { Component, DestroyRef, inject, OnInit, signal, runInInjectionContext, EnvironmentInjector, Type } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { RemoteServicesRegistry } from '../../../shared/remote-services.registry';
import type { PlacesService } from 'host/PlacesService';
import { Place } from '../place.model';
import { PlacesComponent } from '../places/places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { ErrorService } from '../../../shared/modal-error/service/error.service';
@Component({
  selector: 'app-favorite-places',
  standalone: true,
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './favorite-places.component.html',
  styleUrl: './favorite-places.component.scss'
})
export class FavoritePlacesComponent implements OnInit {
  localError = signal('');
  errorService = inject(ErrorService);
  serviceError = signal('');

  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);

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
// -- With this asigment I can update in real time the places ---------------------------------------------------------------------------
      this.places = this.placesService.loadedUserPlaces;
// -- Use of the host service -----------------------------------------------------------------------------------------------------------
      const sub = this.placesService.loadUserPlaces()
        .subscribe({
          error: (error: Error) => { this.localError.set(error.message) },
          complete: () => { this.isFetching.set(false) }
        });
      this.destroRef.onDestroy(() => sub.unsubscribe());
// --------------------------------------------------------------------------------------------------------------------------------------
    } catch (err) {
      this.localError.set('The remote service could not be loaded.');
      this.isFetching.set(false);
    }
  }

  onRemovePlace(selectedPlace: Place) {
    const sub = this.placesService.removeUserPlace(selectedPlace).subscribe({
      error: (error: Error) => {
        console.error(error.message);
        this.errorService.showError('Problem removing place, please try again.')
      }
    });
    this.destroRef.onDestroy(() => sub.unsubscribe());
  }
}
