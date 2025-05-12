import { Component } from '@angular/core';

import { HeaderComponent } from "../components/header/header.component";
import { LessonComponent } from "../components/lesson/lesson.component";
import { TasksComponent } from "../components/tasks/tasks.component";

import { DUMMY_LESSONS } from "../assets/dummy-lessons"
@Component({
  selector: 'app-root-angular-19',
  standalone: true,
  imports: [HeaderComponent, LessonComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  hostDirectives: [] // Automatically applies directives from the array whenever the component is used.
})
export class AppComponent {
  lessons = DUMMY_LESSONS;
  selectedLessonId?: string;

  get selectedLesson() {
    return this.lessons.find((lesson) => lesson.id === this.selectedLessonId)!;
  }

  onSelectLesson(id: string) {
    this.selectedLessonId = id;
  }
}
