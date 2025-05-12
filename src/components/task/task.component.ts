import { Component, inject, input, signal } from '@angular/core';
import { DatePipe } from "@angular/common";

import { type Task } from "./task.model";
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
  taskService = inject(TaskService);

  temperature = signal(39);

  onCompleteTask() {
    this.taskService.removeTask(this.task().id);
  }
}
