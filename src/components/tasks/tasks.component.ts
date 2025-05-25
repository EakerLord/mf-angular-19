import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, ResolveFn, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { TaskComponent } from "../task/task.component";
import { TaskService } from '../../services/tasks.service';
import { DUMMY_LESSONS } from "../../assets/dummy-data"
import { filter } from 'rxjs';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, RouterLink, RouterOutlet],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  lessonId = signal('');
  lessonName = signal('');
  private activatedRoute = inject(ActivatedRoute);

  sortSignal = signal<'asc' | 'desc'>('desc');
  currentChildRoute = signal('');
  isNewTask = computed(() => this.currentChildRoute() === 'new');

  private selectedFilter = signal<string>('all');

  selectedLessonTasks = computed(() => {
    // Accessing the "sortSignal" here (at the beginning) forces the computed to be executed when the queryParan changes.
    const sortedTasks = this.sortSignal();
    const filteredTasks = (() => {
      switch (this.selectedFilter()) {
        case 'open':
          return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'OPEN');
        case 'in-progress':
          return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'IN_PROGRESS');
        case 'done':
          return this.taskService.getLessonTasks(this.lessonId()).filter(task => task.status === 'DONE');
        default:
          return this.taskService.getLessonTasks(this.lessonId());
      }
    })();
    // Sorts the filtered tasks by status and returns them.
    return filteredTasks.sort((a, b) => {
      return sortedTasks === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
  }); // Filtering and Sorting the tasks into this computed signal.

  constructor() {
    // Get the lessonName from the route data dinamically.
    this.activatedRoute.data.subscribe(data => this.lessonName.set(data['lessonName']));

    // Get the lessonId from the route params. No destroRef needed because of route it self.
    this.route.paramMap.subscribe(params => {
      const id = params.get('lessonId');
      if (id) this.lessonId.set(id);
    });

    // Takes the first child route "new" to render conditionally the add task form using isNewRoute and currentChildRoute signals.
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const childPath = this.route.snapshot.firstChild?.routeConfig?.path;
      this.currentChildRoute.set(childPath ?? '');
    });

    // Get the sort param from the query params and toogle it depending on the value.
    this.route.queryParamMap.subscribe(params => {
      const sortParam = params.get('sort');
      if (sortParam === 'asc' || sortParam === 'desc') {
        this.sortSignal.set(sortParam);
      }
    });
  } // No destroRef needed because of route it self.

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

// No subscription needed on ActivatedRouteSnapshot because of route it self.
export const resolveLessonName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const lessonId = activatedRoute.paramMap.get('lessonId');
  return DUMMY_LESSONS.find(lesson => lesson.id === lessonId)?.name || '';
};

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  return resolveLessonName(activatedRoute, routerState) + ' tasks';
};
