import { Routes } from '@angular/router';
import { resolveLessonName, resolveTitle } from '../tasks/tasks.component';
import { canLeaveEditPage } from '../../guards/can-leave-edit-page/can-leave-edit-page.guard';
import { dummyCanMatch } from '../../guards/dummy-can-match/dummy-can-match.guard';

export const routes: Routes = [
  {
    path: 'tasks/:lessonId',
    loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent),
    title: resolveTitle,
    canMatch: [dummyCanMatch],
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
