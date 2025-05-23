import { Component, computed, inject, signal } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { NewTaskComponent } from "../new-task/new-task.component";
import { TaskService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  isAddingTask = signal(false);
  private selectedFilter = signal<string>('all');

  lessonId = signal('');
  lessonName = computed(() => { return 'Lesson: ' + this.lessonId() }); // TEMP
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

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('lessonId');
      if (id) this.lessonId.set(id);
    });
  }

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
