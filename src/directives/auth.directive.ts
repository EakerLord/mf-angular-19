import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TaskService } from '../services/tasks.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective { // Estructural self directive

  renderCondition = input.required<string>({alias: 'appAuth'});
  private tasksService = inject(TaskService);
  private templateRef =inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.tasksService.taskAuthentication(true); // Simple auth method

    effect(() => {
      if (this.tasksService.activePermission() === this.renderCondition()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
