import { Component, inject, AfterViewInit, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from "../components/header/header.component";
import { LessonComponent } from "../components/lesson/lesson.component";
import { ErrorModalComponent } from '../shared/modal-error/components/error/error-modal.component';
import { ErrorService } from '../shared/modal-error/service/error.service';
import { DUMMY_LESSONS_EN, DUMMY_LESSONS_ES } from "../assets/dummy-data"
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root-angular-19',
  standalone: true,
  imports: [HeaderComponent, LessonComponent, ErrorModalComponent, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class AppComponent implements AfterViewInit {
  lessons = (environment.language === 'es') ? DUMMY_LESSONS_ES : DUMMY_LESSONS_EN;
  selectedLessonId? = '';
  errorService = inject(ErrorService);
  error = this.errorService.error;

  private router = inject(Router);
  private document = inject(DOCUMENT);

  ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const mainContent = this.document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    });
  }

  get selectedLesson(): { id: string; name: string; avatar: string } {
    return this.lessons.find((lesson) => lesson.id === this.selectedLessonId)!;
  }

  onSelectLesson(id: string) {
    this.selectedLessonId = id;
  }
}
