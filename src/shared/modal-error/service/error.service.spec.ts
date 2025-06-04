import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial error as empty string', () => {
    expect(service.error()).toBe('');
  });

  it('should set error message on showError', () => {
    service.showError('Test error');
    expect(service.error()).toBe('Test error');
  });

  it('should clear error message on clearError', () => {
    service.showError('Another error');
    service.clearError();
    expect(service.error()).toBe('');
  });
});
