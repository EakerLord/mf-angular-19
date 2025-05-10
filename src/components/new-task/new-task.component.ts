import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../tasks/tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  lessonId = input.required<string>();
  close = output<void>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  constructor(private taskService: TaskService) {}

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate()
      },
      this.lessonId()
    );
    this.close.emit();
  };
}
