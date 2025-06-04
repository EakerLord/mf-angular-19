import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDirective } from './auth.directive';
import { TaskService } from '../../services/tasks/tasks.service';
import { By } from '@angular/platform-browser';

class MockTaskService {
  private _permission: string = '';
  taskAuthentication(_flag: boolean) {}
  activePermission() { return this._permission; }
  setPermission(p: string) { this._permission = p; }
}

@Component({
  template: `<ng-template [appAuth]="permission">Autorizado</ng-template>`,
  standalone: true,
  imports: [AuthDirective]
})
class TestComponent {
  permission = 'admin';
}

describe('AuthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let taskService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    taskService = TestBed.inject(TaskService) as any;
  });

  it('should render the template if permission matches', () => {
    taskService.setPermission('admin');
    fixture.detectChanges();
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).toContain('Autorizado');
  });

  it('should NOT render the template if permission does not match', () => {
    taskService.setPermission('user');
    fixture.detectChanges();
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).not.toContain('Autorizado');
  });

  it('should call taskAuthentication on construction', () => {
    const spy = spyOn(taskService, 'taskAuthentication');
    fixture = TestBed.createComponent(TestComponent);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
