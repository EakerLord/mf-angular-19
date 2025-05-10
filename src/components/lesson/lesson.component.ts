import { Component, computed, input, output } from '@angular/core';
import { NgClass } from "@angular/common";
import { type Lesson } from "./lesson.model";
import { CardComponent } from "../../shared/card/card.component";
@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [NgClass, CardComponent],
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
