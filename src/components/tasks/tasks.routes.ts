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
  if (component.enteredTitle() || component.enteredSummary() || component.enteredDate()) {
    return confirm('Are you sure?')
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
