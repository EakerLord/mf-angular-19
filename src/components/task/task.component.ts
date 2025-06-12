import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { interval } from "rxjs";

import { type Task, type TaskStatus } from "./task.model";
import { CardComponent } from "../../shared/card/card.component";
import { NewRequestComponent } from "../http-request/new-request/new-request.component";
import { TaskService } from '../../services/tasks/tasks.service';
import { TemperaturePipe } from '../../pipes/temperature/temperature.pipe'; // Custom Pipe for temperature
import { AuthDirective } from '../../directives/auth/auth.directive'; // Estructural self directive
import { SafeLinkDirective } from '../../directives/safe-link/safe-link.directive'; // Atribute self directive
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SimpleFormComponent } from '../reactive-forms/simple-form/simple-form.component';
import { ComplexFormComponent } from '../reactive-forms/complex-form/complex-form.component';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CardComponent, DatePipe, TemperaturePipe, SafeLinkDirective, AuthDirective, NewRequestComponent, SimpleFormComponent, ComplexFormComponent, CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class TaskComponent implements OnInit {
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

  // Pipes: Variable needed for the temperature Pipe.
  temperature = signal(39);

  // HTTP Requests: To show the http request component.
  isAddingRequest = signal(false);

  // Reactive Forms: To show the simple or complex form component.
  isShowingSimpleForm = signal(false);
  isShowingComplexForm = signal(false);

  // RxJS: toObservable example
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // Instead of using effect on the constructor to reset the signal values ​​we can convert it to observable
  // RxJS:  toSignal example
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});

  ngOnInit(): void {}

  onClickObservable(){
    this.clickCount.update(prevCount => prevCount + 1);
  }

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
  // Open and close the http request component.
  onStartAddRequest() {
    this.isAddingRequest.set(true);
  }
  onCloseAddRequest() {
    this.isAddingRequest.set(false);
  }
  // Open and close the simple or complex form component.
  onShowSimpleForm() {
    this.isShowingSimpleForm.set(true);
    this.isShowingComplexForm.set(false);
  }
  onShowComplexForm() {
    this.isShowingSimpleForm.set(false);
    this.isShowingComplexForm.set(true);
  }
}
