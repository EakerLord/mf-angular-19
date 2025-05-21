import { Component, computed, inject, input, signal } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { NewTaskComponent } from "../new-task/new-task.component";
import { TaskService } from '../../services/tasks.service';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  isAddingTask = signal(false);
  lessonId = input.required<string>();
  name = input.required<string>();
  private taskService = inject(TaskService);
  private selectedFilter = signal<string>('all');

  selectedLessonTasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'DONE');
      default:
        return this.taskService.getLessonTasks(this.lessonId());
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  onStartAddTask() {
    this.isAddingTask.set(true);
  }
  onCloseAddTask() {
    this.isAddingTask.set(false);
  }
}
