import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { LessonComponent } from "../components/lesson/lesson.component";

@Component({
  selector: 'app-root-angular-19',
  standalone: true,
  imports: [HeaderComponent, LessonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
