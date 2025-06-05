import { CanDeactivateFn } from '@angular/router';
import { NewTaskComponent } from '../../components/new-task/new-task.component';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent) => {
  if (
    component.enteredTitle().length > 0 ||
    component.enteredSummary().length > 0 ||
    component.enteredDate().length > 0
  ) {
    return confirm('Are you sure to leave with unsaved changes?');
  }
  return true;
};
