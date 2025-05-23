import { Component, computed, input, output } from '@angular/core';
import { type Lesson } from "./lesson.model";
import { CardComponent } from "../../shared/card/card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CardComponent, RouterLink, RouterLinkActive],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  lesson = input.required<Lesson>();
  selected = input.required<boolean>();

  select = output<string>();

  imagePath = computed(() => {
    return 'assets/mf-angular-19/' + this.lesson().avatar;
  });

  onSelectLesson() {
    this.select.emit(this.lesson().id);
  }
}
