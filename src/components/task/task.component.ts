import { Component, input } from '@angular/core';
import { DatePipe } from "@angular/common";
import { type Task } from "./task.model";
import { CardComponent } from "../../shared/card/card.component";
import { TaskService } from '../tasks/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = input.required<Task>();
  constructor(private taskService: TaskService) {}

  onCompleteTask() {
    this.taskService.removeTask(this.task().id);
  }
}
