import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FavoritePlacesComponent } from './favorite-places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places/places.component';
import { of, throwError, Subject } from 'rxjs';
import { Place } from '../place.model';
import { ErrorService } from '../../../shared/modal-error/service/error.service';
import { signal } from '@angular/core';
import { mfWrapperForTesting } from '../../../shared/mf-wrapper-test';
import { RemoteServicesRegistry } from '../../../shared/remote-services.registry';
import { EnvironmentInjector } from '@angular/core';

class MockPlacesService {
  loadedUserPlaces = signal<Place[]>([]);
  loadUserPlaces = jasmine.createSpy().and.returnValue(of(null));
  removeUserPlace = jasmine.createSpy().and.returnValue(of(null));
}

const MOCK_PLACES: Place[] = [{ id: '1', title: 'Test Place', image: { src: 'test.jpg', alt: 'Test' }, lat: 0, lon: 0 }];

describe('FavoritePlacesComponent', () => {
  let component: FavoritePlacesComponent;
  let fixture: ComponentFixture<FavoritePlacesComponent>;
  let mockPlacesService: MockPlacesService;
  let mockErrorService: jasmine.SpyObj<ErrorService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FavoritePlacesComponent, PlacesContainerComponent, PlacesComponent],
      providers: [
        { provide: ErrorService, useValue: jasmine.createSpyObj('ErrorService', ['showError']) }
      ],
      teardown: { destroyAfterEach: true }
    }).compileComponents();

    mockPlacesService = new MockPlacesService();

    spyOn(mfWrapperForTesting, 'loadRemoteModule').and.resolveTo({PlacesService: MockPlacesService});

    RemoteServicesRegistry.placesService = new MockPlacesService();

    fixture = TestBed.createComponent(FavoritePlacesComponent);
    component = fixture.componentInstance;
    mockErrorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  }));

  afterEach(() => {
    RemoteServicesRegistry.placesService = null;
    if (fixture) { fixture.destroy() };
  });

  it('should create', () => { expect(component).toBeTruthy() });

  it('should load remote service and register instance', fakeAsync(async () => {
    await component.ngOnInit();

    expect(mfWrapperForTesting.loadRemoteModule).toHaveBeenCalledWith({
      type: 'module',
      remoteEntry: 'http://localhost:4200/remoteEntry.js',
      exposedModule: './PlacesService'
    });

    expect(RemoteServicesRegistry.placesService).toBeInstanceOf(MockPlacesService);
    expect(component.isFetching()).toBeFalse();
  }));

  it('should update places from service signal', fakeAsync(() => {
    const testPlaces = [...MOCK_PLACES];
    (RemoteServicesRegistry.placesService as MockPlacesService).loadedUserPlaces.set(testPlaces);

    component.ngOnInit();
    tick();

    expect(component.places()).toEqual(testPlaces);
    expect(component.isFetching()).toBeFalse();
  }));

  it('should handle loading states correctly', fakeAsync(() => {
    const loadingSubject = new Subject<void>();
    (RemoteServicesRegistry.placesService as MockPlacesService).loadUserPlaces.and.returnValue(loadingSubject);

    component.ngOnInit();
    expect(component.isFetching()).toBeTrue();

    loadingSubject.complete();
    tick();

    expect(component.isFetching()).toBeFalse();
  }));

  it('should show error on remove failure', fakeAsync(() => {
    component['placesService'] = RemoteServicesRegistry.placesService as MockPlacesService;

    (RemoteServicesRegistry.placesService as MockPlacesService).removeUserPlace
      .and.returnValue(throwError(() => new Error('Server error')));

    component.onRemovePlace(MOCK_PLACES[0]);
    tick();

    expect(mockErrorService.showError).toHaveBeenCalledWith('Problem removing place, please try again.');
  }));

  it('should reflect states in template', fakeAsync(() => {
    component.isFetching.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
      .toContain('Loading your favorite places');

    component.isFetching.set(false);
    component.places.set([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
      .toContain('Unfortunately, no places could be found');

    component.localError.set('Test error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
      .toContain('Test error');
  }));

  it('should execute remove operation through service', () => {
    component['placesService'] = RemoteServicesRegistry.placesService as MockPlacesService;
    component.onRemovePlace(MOCK_PLACES[0]);

    expect((RemoteServicesRegistry.placesService as MockPlacesService).removeUserPlace)
      .toHaveBeenCalledWith(MOCK_PLACES[0]);
  });

  it('should handle service loading error', fakeAsync(async () => {
    (mfWrapperForTesting.loadRemoteModule as jasmine.Spy).and.rejectWith(new Error('Connection failed'));
    await component.ngOnInit();

    expect(component.localError()).toContain('The remote service could not be loaded.');
    expect(component.isFetching()).toBeFalse();
    expect(RemoteServicesRegistry.placesService).toBeNull();
  }));
});
