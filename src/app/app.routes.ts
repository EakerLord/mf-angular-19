import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { routes as tasksRoutes } from "../components/tasks/tasks.routes";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: tasksRoutes
    // data: { exampleText: 'Example text' }
  },
  {
    path: '**',
    loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent),
  }
];
