export const DUMMY_LESSONS = [
  {
    id: 'l1',
    name: 'Data biding',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l2',
    name: 'Directives',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l3',
    name: 'Pipes',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l4',
    name: 'Dependency Injection',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l5',
    name: 'Observables - RxJS',
    avatar: 'rxjs.png',
  },
  {
    id: 'l6',
    name: 'HTTP Requests',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l7',
    name: 'Reactive Forms',
    avatar: 'angular-logo.png',
  },
];

export const DUMMY_TASKS = [
  {
    id: 't1',
    lessonId: 'l1',
    title: 'Data biding',
    summary: 'It is the mechanism that allows synchronizing data between the model (component.ts) and the view (template.html):',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
  {
    id: 't2',
    lessonId: 'l2',
    title: 'Directives',
    summary: 'Example of a structural directive called "*appAuth" and an attribute directive called "appSafeLink":',
    dueDate: '2025-12-31',
    status: 'DONE'
  },
  {
    id: 't3',
    lessonId: 'l3',
    title: 'Pipes',
    summary: 'Example of the inbuild "DatePipe" and a custom pipe named "temperature" that can accept up to two configuration attributes:',
    dueDate: '2025-12-31',
    status: 'IN_PROGRESS'
  },
  {
    id: 't4',
    lessonId: 'l4',
    title: 'Dependency Injection',
    summary: 'It is a design pattern that allows you to automatically provide instances of classes (dependencies) that other objects (such as components or services) need to function, without having to create them directly.',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
  {
    id: 't5',
    lessonId: 'l5',
    title: 'RxJS',
    summary: 'Information, comparisons and examples of RxJS, observable pattern:',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
  {
    id: 't6',
    lessonId: 'l6',
    title: 'HTTP Requests',
    summary: 'Information and examples of HTTP requests, also with observable pattern:',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
  {
    id: 't7',
    lessonId: 'l7',
    title: 'Reactive Forms',
    summary: 'Practical example of a form with the implementation of: ngSubmit, ngModel, required, #XXXX="ngModel", conditional rendering and conditional classes:',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
]
