import { Component, effect, inject, output, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks/tasks.service';
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  close = output<void>();
  taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  lessonId = signal('');
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  constructor() {
    effect(() => {
      const parentParams = this.route.parent?.snapshot.paramMap;
      const id = parentParams?.get('lessonId');
      if (id) this.lessonId.set(id);
    });
  }

  onSubmit() {
    this.taskService.addTask({title: this.enteredTitle(), summary: this.enteredSummary(), date: this.enteredDate(), status: 'OPEN'}, this.lessonId());
    this.router.navigate(['../'], {relativeTo: this.route});
  };
}
