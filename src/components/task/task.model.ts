export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  lessonId: string;
  title: string;
  summary: string;
  dueDate: string;
  status: string;
}

export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
  status: string;
}
