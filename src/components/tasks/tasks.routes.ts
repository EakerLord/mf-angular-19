import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks/:lessonId',
    loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent),
    children: [
      {
        path: 'new',
        loadComponent: () => import('../new-task/new-task.component').then(m => m.NewTaskComponent),
      }
    ]
  }
];
