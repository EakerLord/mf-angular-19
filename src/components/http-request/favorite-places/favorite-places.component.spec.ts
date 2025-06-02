// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { FavoritePlacesComponent } from './favorite-places.component';
// import { PlacesContainerComponent } from '../places-container/places-container.component';
// import { PlacesComponent } from '../places/places.component';
// import { BehaviorSubject, of, throwError, Subject } from 'rxjs';
// import { Place } from '../place.model';
// import { ErrorService } from '../../../shared/modal-error/error.service';
// import { EnvironmentInjector } from '@angular/core';

// class MockPlacesService {
//   loadedUserPlaces = new BehaviorSubject<Place[]>([]);
//   loadUserPlaces = jasmine.createSpy().and.returnValue(of(null));
//   removeUserPlace = jasmine.createSpy().and.returnValue(of(null));
// }
// const MOCK_PLACES: Place[] = [{
//   id: '1',
//   title: 'Test Place',
//   image: { src: 'test.jpg', alt: 'Test' },
//   lat: 0,
//   lon: 0
// }];

// let loadRemoteModuleSpy: jasmine.Spy;
// let remoteServiceInstance: MockPlacesService;

// describe('FavoritePlacesComponent', () => {
//   let component: FavoritePlacesComponent;
//   let fixture: ComponentFixture<FavoritePlacesComponent>;
//   let errorService: ErrorService;

//   beforeEach(async () => {
//     remoteServiceInstance = new MockPlacesService();

//     loadRemoteModuleSpy = spyOn(
//       await import('@angular-architects/module-federation'),
//       'loadRemoteModule'
//     ).and.callFake(() => Promise.resolve({
//       PlacesService: MockPlacesService
//     }));

//     (window as any).RemoteServicesRegistry = { placesService: null };

//     await TestBed.configureTestingModule({
//       imports: [
//         FavoritePlacesComponent,
//         PlacesContainerComponent,
//         PlacesComponent
//       ],
//       providers: [
//         { provide: ErrorService, useValue: jasmine.createSpyObj('ErrorService', ['showError']) },
//         { provide: EnvironmentInjector, useValue: TestBed.inject(EnvironmentInjector) }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(FavoritePlacesComponent);
//     component = fixture.componentInstance;
//     errorService = TestBed.inject(ErrorService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load remote service on init', fakeAsync(async () => {
//     await component.ngOnInit();
//     expect(component['placesService']).toBeDefined();
//     expect(component.isFetching()).toBeFalse();
//   }));

//   it('should handle remote service loading error', fakeAsync(async () => {
//     loadRemoteModuleSpy.and.returnValue(Promise.reject(new Error('Loading failed')));
//     await component.ngOnInit();
//     expect(component.localError()).toContain('The remote service could not be loaded');
//     expect(component.isFetching()).toBeFalse();
//   }));

//   it('should update places from service', fakeAsync(async () => {
//     await component.ngOnInit();
//     component.places.set(MOCK_PLACES);
//     fixture.detectChanges();
//     expect(component.places()).toEqual(MOCK_PLACES);
//   }));

//   it('should handle loading states', fakeAsync(async () => {
//     const loadingSubject = new Subject<void>();
//     remoteServiceInstance.loadUserPlaces.and.returnValue(loadingSubject);

//     await component.ngOnInit();
//     expect(component.isFetching()).toBeTrue();

//     loadingSubject.complete();
//     expect(component.isFetching()).toBeFalse();
//   }));

//   it('should handle remove place operation', () => {
//     component['placesService'] = remoteServiceInstance;
//     component.onRemovePlace(MOCK_PLACES[0]);
//     expect(remoteServiceInstance.removeUserPlace).toHaveBeenCalledWith(MOCK_PLACES[0]);
//   });

//   it('should show error on remove failure', () => {
//     spyOn(errorService, 'showError').and.stub();
//     remoteServiceInstance.removeUserPlace.and.returnValue(throwError(() => new Error('Remove failed')));

//     component['placesService'] = remoteServiceInstance;
//     component.onRemovePlace(MOCK_PLACES[0]);
//     expect(errorService.showError).toHaveBeenCalledWith('Problem removing place, please try again.');
//   });

//   it('should display correct states in template', fakeAsync(async () => {
//     // Test loading state
//     component.isFetching.set(true);
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
//       .toContain('Loading your favorite places');

//     // Test empty state
//     component.isFetching.set(false);
//     component.places.set([]);
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
//       .toContain('Unfortunately, no places could be found');

//     // Test error state
//     component.localError.set('Test error');
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
//       .toContain('Test error');
//   }));
// });
