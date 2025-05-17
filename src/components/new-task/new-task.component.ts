import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks.service';
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
  taskService = inject(TaskService);

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask({title: this.enteredTitle(), summary: this.enteredSummary(), date: this.enteredDate(), status: 'OPEN'}, this.lessonId());
    this.close.emit();
  };
}
