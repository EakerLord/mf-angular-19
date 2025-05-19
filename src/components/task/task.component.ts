import { Component, computed, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from "@angular/common";
import { interval, map, Observable } from "rxjs";

import { type Task, type TaskStatus } from "./task.model";
import { CardComponent } from "../../shared/card/card.component";
import { TaskService } from '../../services/tasks.service';
import { TemperaturePipe } from '../../pipes/temperature.pipe'; // Custom Pipe for temperature
import { AuthDirective } from '../../directives/auth.directive'; // Estructural self directive
import { SafeLinkDirective } from '../../directives/safe-link.directive'; // Atribute self directive
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe, TemperaturePipe, SafeLinkDirective, AuthDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class TaskComponent implements OnInit {
  task = input.required<Task>();
  private taskService = inject(TaskService);
  temperature = signal(39); // Variable needed for the temperature Pipe.
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

  private destroyRef = inject(DestroyRef); // An alternative to ngOnDestroy lifecycle.
  // toObservable example
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // Instead of using effect on the constructor to reset the signal values ​​we can convert it to observable
  // toSignal example
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  // Custom Observable
  // customInterval$ = new Observable((subscriber) => {
  //   setInterval(() => {
  //     subscriber.next({message: 'New Value', value: 1})
  //   }, 2000);
  // });

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount} times.`);
    // })
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe( // Normal interval observable
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)
    // });
    // const subscription = this.customInterval$.subscribe({ // Custom interval observable
    //   next: (val) => console.log(val)
    // });
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount} times.`)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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
}
