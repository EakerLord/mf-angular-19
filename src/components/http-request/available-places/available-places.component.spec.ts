import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { type Place } from '../place.model';
import { AvailablePlacesComponent } from './available-places.component';
import { PlacesComponent } from '../places/places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { ErrorService } from '../../../shared/modal-error/service/error.service';
import { mfWrapperForTesting } from '../../../shared/mf-wrapper-test';
import { RemoteServicesRegistry } from '../../../shared/remote-services.registry';
import { signal } from '@angular/core';
import { EnvironmentInjector } from '@angular/core';

class MockPlacesService {
  loadedAvailablePlaces = signal<Place[]>([]);
  loadAvailablePlaces = jasmine.createSpy().and.returnValue(of([]));
  addPlaceToUserPlaces = jasmine.createSpy().and.returnValue(of({}));
}

class MockErrorService {
  showError = jasmine.createSpy();
}

describe('AvailablePlacesComponent', () => {
  let component: AvailablePlacesComponent;
  let fixture: ComponentFixture<AvailablePlacesComponent>;
  let mockPlacesService: MockPlacesService;
  let mockErrorService: MockErrorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AvailablePlacesComponent, PlacesComponent, PlacesContainerComponent],
      providers: [{ provide: ErrorService, useClass: MockErrorService }],
      teardown: { destroyAfterEach: true }
    }).compileComponents();

    mockPlacesService = new MockPlacesService();

    spyOn(mfWrapperForTesting, 'loadRemoteModule').and.resolveTo({PlacesService: MockPlacesService});

    RemoteServicesRegistry.placesService = new MockPlacesService();

    fixture = TestBed.createComponent(AvailablePlacesComponent);
    component = fixture.componentInstance;
    mockErrorService = TestBed.inject(ErrorService) as unknown as MockErrorService;
  }));

  afterEach(() => {
    RemoteServicesRegistry.placesService = null;
    const loadRemoteSpy = mfWrapperForTesting.loadRemoteModule as jasmine.Spy;
    if (loadRemoteSpy?.calls) { loadRemoteSpy.calls.reset() };
    if (fixture) { fixture.destroy() };
  });

  it('should create', () => { expect(component).toBeTruthy() });

  it('should show loading state initially', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.isFetching()).toBeTrue();
    expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
      .toContain('Loading the available places');

    tick();
    fixture.detectChanges();
  }));

  it('should show error when remote module fails to load', fakeAsync(() => {
    (mfWrapperForTesting.loadRemoteModule as jasmine.Spy).and.rejectWith(new Error('Loading failed'));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.localError()).toContain('The remote service could not be loaded.');
    expect(fixture.nativeElement.querySelector('.places-fallback-text').textContent)
      .toContain('The remote service could not be loaded.');
  }));

  it('should handle service errors', fakeAsync(() => {
    const errorMessage = 'Failed to load places';
    (RemoteServicesRegistry.placesService as MockPlacesService).loadAvailablePlaces
      .and.returnValue(throwError(() => new Error(errorMessage)));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.localError()).toContain(errorMessage);
  }));

  it('should display places after successful load', fakeAsync(() => {
    const mockPlaces = [{
      id: '1',
      title: 'Test Place',
      image: { src: 'test.jpg', alt: 'Test image' },
      lat: 40.7128,
      lon: -74.0060
    }];

    (RemoteServicesRegistry.placesService as MockPlacesService).loadedAvailablePlaces.set(mockPlaces);
    (RemoteServicesRegistry.placesService as MockPlacesService).loadAvailablePlaces.and.returnValue(of(mockPlaces));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.places()).toEqual(mockPlaces);
    expect(fixture.nativeElement.querySelector('app-places')).toBeTruthy();
  }));

  it('should handle place selection errors', fakeAsync(() => {
    mockPlacesService.addPlaceToUserPlaces.and.returnValue(throwError(() => new Error('Add place error')));

    (component as any)['placesService'] = mockPlacesService;

    component.onSelectPlace({
      id: '1',
      title: 'Test Place',
      image: { src: 'test.jpg', alt: 'Test image' },
      lat: 40.7128,
      lon: -74.0060
    });

    tick();
    expect(mockErrorService.showError).toHaveBeenCalledWith('Problem adding place, please try again.');
  }));
});
