import { Injectable, signal } from "@angular/core";
import { NewTaskData } from "../components/task/task.model";
@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks = [
    {
      id: 't1',
      lessonId: 'l1',
      title: 'Data biding',
      summary: 'Full example of data biding.',
      dueDate: '2025-12-31'
    },
    {
      id: 't2',
      lessonId: 'l2',
      title: 'Directives',
      summary: 'Full example of directives.',
      dueDate: '2025-12-31'
    },
    {
      id: 't3',
      lessonId: 'l3',
      title: 'Dependency Injection',
      summary: 'Full example of Dependency Injection.',
      dueDate: '2025-12-31'
    },
    {
      id: 't4',
      lessonId: 'l4',
      title: 'Pipes',
      summary: 'Full example of Dependency pipes.',
      dueDate: '2025-12-31'
    }
  ];
  activePermission = signal<string>('guest');

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getLessonTasks(lessonId: string) {
    return this.tasks.filter((task) => task.lessonId === lessonId);
  }
  addTask(task: NewTaskData, lessonId: string) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      lessonId: lessonId,
      title: task.title,
      summary: task.summary,
      dueDate: task.date
    });
    this.saveTasks();
  }
  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Estructural directive method
  taskAuthentication(taskCode: boolean) {
    if (taskCode) {
      this.activePermission.set('fede');
    } else {
      this.activePermission.set('guest');
    }
  }
}
