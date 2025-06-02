import { CanDeactivateFn, CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { resolveLessonName, resolveTitle } from '../tasks/tasks.component';
import { inject } from '@angular/core';
import { NewTaskComponent } from '../new-task/new-task.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) return true;
  alert('dummyCanMatch -> You do not have access');
  return new RedirectCommand(router.parseUrl('/a19'));
};

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent) => {
  console.log(component)
  if (component.enteredTitle().length > 0 || component.enteredSummary().length > 0 || component.enteredDate().length > 0) {
    return confirm('Are you sure to leave with unsaved changes?')
  };
  return true;
};

export const routes: Routes = [
  {
    path: 'tasks/:lessonId',
    loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent),
    title: resolveTitle,
    // canMatch: [dummyCanMatch],
    children: [
      {
        path: 'new',
        loadComponent: () => import('../new-task/new-task.component').then(m => m.NewTaskComponent),
        title: 'New task',
        canDeactivate: [canLeaveEditPage]
      }
    ],
    // data: { exampleText: 'Example text' },
    resolve: { lessonName: resolveLessonName },
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  }
];
