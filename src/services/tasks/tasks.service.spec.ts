import { TestBed } from '@angular/core/testing';
import { TaskService } from './tasks.service';
import { DUMMY_TASKS_EN } from '../../assets/dummy-data';
import { TaskStatus } from '../../components/task/task.model';

describe('TaskService', () => {
  let service: TaskService;
  const mockLocalStorage = {
    getItem: jasmine.createSpy('getItem'),
    setItem: jasmine.createSpy('setItem'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    service = TestBed.inject(TaskService);
    mockLocalStorage.getItem.calls.reset();
    mockLocalStorage.setItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should initialize with dummy tasks if no localStorage data', () => {
      mockLocalStorage.getItem.and.returnValue(null);
      const freshService = new TaskService();
      expect(freshService.tasks()).toEqual(DUMMY_TASKS_EN);
    });

    it('should load tasks from localStorage if available', () => {
      const storedTasks = JSON.stringify([...DUMMY_TASKS_EN, {
        id: '999',
        lessonId: 'math-1',
        title: 'Test Task',
        summary: 'Test Summary',
        dueDate: '2023-01-01',
        status: 'pending'
      }]);

      mockLocalStorage.getItem.and.returnValue(storedTasks);
      const freshService = new TaskService();
      expect(freshService.tasks().length).toBe(DUMMY_TASKS_EN.length + 1);
    });
  });

  describe('getLessonTasks()', () => {
    it('should filter tasks by lessonId', () => {
      const mathTasks = service.getLessonTasks('math-1');
      expect(mathTasks.every(t => t.lessonId === 'math-1')).toBeTrue();
    });
  });

  describe('addTask()', () => {
    it('should add new task and update localStorage', () => {
      const initialLength = service.tasks().length;
      const newTask = {
        title: 'New Task',
        summary: 'New Summary',
        date: '2023-12-31',
        status: 'completed' as TaskStatus
      };

      service.addTask(newTask, 'science-1');

      expect(service.tasks().length).toBe(initialLength + 1);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'tasks',
        jasmine.stringContaining('science-1')
      );
    });
  });

  describe('removeTask()', () => {
    it('should remove task by id and update localStorage', () => {
      const taskToRemove = service.tasks()[0];
      service.removeTask(taskToRemove.id);

      expect(service.tasks().some(t => t.id === taskToRemove.id)).toBeFalse();
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('updateTaskStatus()', () => {
    it('should update task status', () => {
      const taskId = service.tasks()[0].id;
      service.updateTaskStatus(taskId, 'DONE');

      const updatedTask = service.tasks().find(t => t.id === taskId);
      expect(updatedTask?.status).toBe('DONE');
    });
  });

  describe('taskAuthentication()', () => {
    it('should set permission to "fede" when true', () => {
      service.taskAuthentication(true);
      expect(service.activePermission()).toBe('fede');
    });

    it('should set permission to "guest" when false', () => {
      service.taskAuthentication(false);
      expect(service.activePermission()).toBe('guest');
    });
  });
});
