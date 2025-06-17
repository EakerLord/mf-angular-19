import { Injectable, signal } from "@angular/core";
import { NewTaskData, TaskStatus, Task } from "../../components/task/task.model";
import { environment } from '../../environments/environment';
import { DUMMY_TASKS_EN, DUMMY_TASKS_ES } from "../../assets/dummy-data";
@Injectable({providedIn: 'root'})
export class TaskService {
  tasks = signal<Task[]>([]);
  activePermission = signal<string>('guest');

  constructor() {
    if (environment.language === 'es') { this.tasks.set(DUMMY_TASKS_ES) } else { this.tasks.set(DUMMY_TASKS_EN) };
    (environment.language === 'es') ? console.log('Español') : console.log('English');
    const tasks = localStorage.getItem('tasks');
    if (tasks) { this.tasks.set(JSON.parse(tasks)) };
  }
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  getLessonTasks(lessonId: string) {
    return this.tasks().filter((task: Task) => task.lessonId === lessonId);
  }
  addTask(task: NewTaskData, lessonId: string) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      lessonId: lessonId,
      title: task.title,
      summary: task.summary,
      dueDate: task.date,
      status: task.status
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.saveTasks();
  }
  removeTask(id: string) {
    this.tasks.set(this.tasks().filter((task: Task) => task.id !== id));
    this.saveTasks();
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map(
        (task => task.id === taskId ? {...task, status: newStatus} : task)
      )
    );
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
