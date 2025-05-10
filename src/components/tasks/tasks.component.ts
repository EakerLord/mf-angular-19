import { Component, computed, input } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { NewTaskComponent } from "../new-task/new-task.component";
import { TaskService } from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  lessonId = input.required<string>();
  name = input.required<string>();

  isAddingTask = false;

  constructor(private taskService: TaskService) {}

  selectedLessonTasks = computed(() => {
    return this.taskService.getLessonTasks(this.lessonId());
  });

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
