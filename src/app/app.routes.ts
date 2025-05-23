import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'tasks/:lessonId',
        loadComponent: () => import('../components/tasks/tasks.component').then(m => m.TasksComponent),
      }
    ]
  }
];
