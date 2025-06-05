import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { remoteA19Interceptor } from './remote-a19.interceptor';

describe('remoteA19Interceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const apiHost = 'http://localhost:4201';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([remoteA19Interceptor])
        ),
        provideHttpClientTesting(),
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend the API host to relative URLs', () => {
    http.get('/users').subscribe();
    const req = httpMock.expectOne(apiHost + '/users');
    expect(req.request.url).toBe(apiHost + '/users');
    req.flush({});
  });

  it('should not modify absolute URLs', () => {
    http.get('https://external.com/data').subscribe();
    const req = httpMock.expectOne('https://external.com/data');
    expect(req.request.url).toBe('https://external.com/data');
    req.flush({});
  });
});
