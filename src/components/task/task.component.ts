import { Component, computed, inject, input, signal } from '@angular/core';
import { DatePipe } from "@angular/common";

import { type Task, type TaskStatus } from "./task.model";
import { TaskService } from '../../services/tasks.service';
import { CardComponent } from "../../shared/card/card.component";
import { TemperaturePipe } from '../../pipes/temperature.pipe'; // Custom Pipe for temperature
import { AuthDirective } from '../../directives/auth.directive'; // Estructural self directive
import { SafeLinkDirective } from '../../directives/safe-link.directive'; // Atribute self directive
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe, TemperaturePipe, SafeLinkDirective, AuthDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class TaskComponent {
  task = input.required<Task>();
  private taskService = inject(TaskService);

  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  temperature = signal(39);

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskService.updateTaskStatus(taskId, newStatus);
  }

  onCompleteTask() {
    this.taskService.removeTask(this.task().id);
  }
}
