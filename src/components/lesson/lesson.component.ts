import { Component } from '@angular/core';
import { DUMMY_LESSONS } from "../../assets/dummy-lessons";

const randomIndex = Math.floor(Math.random() * DUMMY_LESSONS.length);

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  selectedLesson = DUMMY_LESSONS[randomIndex];
}
