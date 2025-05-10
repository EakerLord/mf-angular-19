export interface Task {
  id: string;
  lessonId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export interface NewTaskData {
  title: string;
  summary: string;
  date: string
}
