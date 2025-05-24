import { DUMMY_LESSONS } from "../assets/dummy-data"

import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { LessonComponent } from "../components/lesson/lesson.component";
import { ErrorService } from '../shared/modal-error/error.service';
import { ErrorModalComponent } from '../shared/modal-error/error/error-modal.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root-angular-19',
  standalone: true,
  imports: [HeaderComponent, LessonComponent, ErrorModalComponent, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class AppComponent {
  lessons = DUMMY_LESSONS;
  selectedLessonId? = '';
  errorService = inject(ErrorService);
  error = this.errorService.error;

  get selectedLesson(): { id: string; name: string; avatar: string } {
    return this.lessons.find((lesson) => lesson.id === this.selectedLessonId)!;
  }

  onSelectLesson(id: string) {
    this.selectedLessonId = id;
  }
}
