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
    name: 'Routes',
    avatar: 'angular-logo.png',
  },
  {
    id: 'l8',
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
    summary: 'Special classes that allow you to modify the behavior, appearance or structure of the elements in the DOM of an application.',
    dueDate: '2025-12-31',
    status: 'DONE'
  },
  {
    id: 't3',
    lessonId: 'l3',
    title: 'Pipes',
    summary: 'Tools that allow you to transform and format data directly in HTML templates, without modifying the original value in the component.',
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
    title: 'Routes',
    summary: 'Information and examples in code of routing ans its complements:',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
    {
    id: 't8',
    lessonId: 'l8',
    title: 'Reactive Forms',
    summary: 'Practical example of a form with the implementation of: ngSubmit, ngModel, required, #XXXX="ngModel", conditional rendering and conditional classes:',
    dueDate: '2025-12-31',
    status: 'OPEN'
  },
]
